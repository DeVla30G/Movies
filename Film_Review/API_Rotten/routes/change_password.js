var express = require('express');
var app = express.Router();

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const verifyIdentity = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) return res.status(400).send({msg: "Please provide a token"});

    jwt.verify(token, process.env.MAIL_TOKEN_SECRET ,(err, user) => {
        if(err) return res.status(401).send({msg:"This token is not valid."});

        req.user = user;
        let sql = `SELECT reset_password_token FROM users WHERE email="${user.email}"`;
        con.query(sql, (err, result, fields) => {
            if (err) return res.status(500).send(err);

            if(result) {
                if(result[0].reset_password_token != token) return res.status(403).send({msg:"Not the good token."});
                next();
            }
        })
    })
}

/**
 * @swagger
 * /change-password:
 *   post:
 *     produces:
 *       - text/plain
 *     consumes:
 *       - application/json
 *     tags:
 *       - Authentication
 *     security:
 *       - Password Token: []
 *     parameters:
 *       - in: body
 *         name: userInfo
 *         schema:
 *           type: object
 *           required:
 *             - password
 *           properties:
 *             password:
 *               type: string
 *               example: mySuperSecretPassword2
 *     responses:
 *       200:
 *         description: OK (changed password)
 *       404:
 *         description: Not Found
 */
app.post("/", verifyIdentity, (req, res) => {
    email = req.user.email;

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if(err) return res.status(500).send(err);

        let hashedPassword = hash;

        let sql = `UPDATE users SET password="${hashedPassword}", reset_password_token=null WHERE email="${email}";`;
        con.query(sql, (err, result, fields) => {
            if(err) return res.status(500).send(err);

            if(result) {
                return res.status(200).send({msg:"Changed password"});
            }
        });
        return;
    })
    return;
})

module.exports = app;