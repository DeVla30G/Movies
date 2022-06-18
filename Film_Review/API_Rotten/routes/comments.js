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



app.get('/', (req, res) => {
    let sql = `SELECT * FROM comments`;
    con.query(sql, async (err, result, fields) => {
        if(err) return res.status(500).send(err);
        if(result) {
            let movie = result.map(movie => {
                return movie;
            })
            return res.status(200).send(movie);
        }
    });
    return ;
})


app.post("/:id", (req, res) => {
    let body = req.body;
    if (body.comment) {
             
                    const comment = req.body.comment;
                    const movie_id = req.params.id;
                    
                    con.query(`INSERT INTO comments (comment, movie_id) VALUES ("${comment}", "${movie_id}")`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"Comment already exists."});
                                return;
                            }
                            res.status(500).send(err);
                            return;
                        }

                        if (result) {
                            res.json({success: true});
                            
                        }
                    })

    } else {
        res.status(400).send({msg:"Please verify your request includes your comment"});
        return;
    }
})

module.exports = app;