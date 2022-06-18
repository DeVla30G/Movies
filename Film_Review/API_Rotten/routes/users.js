const express = require('express');
const app = express.Router();

const apiUrl = require("../config.json").apiUrl;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const verifyIdentity = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(400).send({ msg: "Please provide a token" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ msg: "This token is not valid." });

        req.user = user;
        next();
    });
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/**
 * @swagger
 * /users/a/{id}:
 *  get:
 *     tags:
 *       - Users
 *     description: durée existence du compte
 *     parameters:
 *         -  in: path
 *            name: id
 *            schema:
 *               type: string
 *               format: date
 *     responses:
 *        200:
 *          description: successful operation
 */
// time of existence of the account

    app.get("/a/:id", (req, res) => {
    let sql = `SELECT DATE(create_time), CURDATE(), DATEDIFF(CURDATE(), create_time) FROM users WHERE id =${req.params.id}`;

    con.query(sql, async (err, result, fields) => {
        if (err) return res.status(500).send(err);
        if(result) return res.status(200).send(result);

       console.log(result);
    });
  });





// Get users

/**
 * @swagger
 * /users:
 *   get:
 *     produces:
 *       - application/json
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/', (req, res) => {
    let sql = `SELECT * FROM users`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let clean = result.map(user => {
                delete user.password;
                delete user.reset_password_token;
                return user;
            })
            return res.status(200).send(clean);
        }
    });
    return ;
})

// Get user

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
app.get("/:id", (req, res) => {
    let sql = `SELECT * FROM users WHERE id=${req.params.id}`;
    con.query(sql, (err, result, fields) => {
        if(err) return res.status(500).send(err);

        if(result) {
            if(result.length == 0) return res.status(404).send({message: "User not found"});
            let user = result[0];
            delete user.password;
            delete user.reset_password_token;
            return res.status(200).send(user);
        }
    });
    return;
})

/**
 * @swagger
 * /Users/{id}:
 *   patch:
 *      tags:
 *      - Users
 *      description: this returns user by id and update it
 *      security:
 *          - JWT token: []
 *      parameters:
 *          -in: path
 *          name: id
 *      responses:
 *       200:
 *         description: User profile with fields to update
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *
 */

 app.patch("/:id", (req, res) => {
    let body = req.body;

    if (body.email && body.password) {

        // Check email
        if (validateEmail(body.email)) {
            // Hashing password
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                const email = req.body.email;
                const password = hash;
                con.query(`UPDATE users SET email = "${req.body.email}", password = "${password}" WHERE id =${req.params.id};`, async (err, result, fields) => {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY") {
                            res.status(409).send({msg:"User already exists."});
                            return;
                        }
                        res.status(500).send(err);
                        return;
                    }
                    if (result) {
                    res.json({success: true});
                    }
                })
            })
        } else {
            res.status(400).send({msg:"Please verify you entered a correct email."});
            return;
        }
    } else {
        res.status(400).send({msg:"Please verify your request includes an email and a password"});
        return;
    }
})

/**
* @swagger
* paths:
*  /users/{id}:
*   get:
*      parameters:
*       - in: path
*         name: id
*         required: true
*/

app.get("/users/:id", (req, res) => {

    let sql = `SELECT role FROM users WHERE id = ${req.params.id};`

    con.query(sql, (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result){
            if(result === 0) return res.status(200).send('user') ;
            if(result === 1) return res.status(200).send('admin') ;
        }

    });
 });

 app.delete("/users/:id", (req, res) => {

    let sql = `SELECT role FROM users WHERE id = ${req.params.id};`

    con.query(sql, (result, fields) => {
        if (result) {
            res.json({success: true});
            }

    });
 });

module.exports = app;