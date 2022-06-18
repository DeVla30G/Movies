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
    let sql = `SELECT * FROM movies`;
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

// Get movie


app.get("/:id", (req, res) => {
    let sql = `SELECT * FROM movies WHERE id=${req.params.id}`;
    con.query(sql, (err, result, fields) => {
        if(err) return res.status(500).send(err);

        if(result) {
            if(result.length == 0) return res.status(404).send({message: "movie not found"});
            let movie = result[0];
            return res.status(200).send(movie);
        }
    });
    return;
})


 app.patch("/:id", verifyIdentity, (req, res) => {
    let body = req.body;

    if (body.title && body.overview && body.genre_name) {

                con.query(`UPDATE movies SET title = "${req.body.title}", overview = "${req.body.overview}", genre_name = "${req.body.genre_name}" WHERE id =${req.params.id};`, async (err, result, fields) => {
                    if (err) {
                        if (err.code == "ER_DUP_ENTRY") {
                            res.status(409).send({msg:"movie already exists."});
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
        res.status(400).send({msg:"Please verify your request includes a title, an overview and a genre_name"});
        return;
    }
})


//rate movie

app.post("/:id", (req, res) => {
    let body = req.body;
    if (body.vote_count) {
             
                    const vote_count = req.body.vote_count;
                    
                    con.query(`INSERT INTO vote_count (vote_count, movie_id) VALUES ("${vote_count}", "${req.params.id}")`, async (err, result, fields) => {
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                res.status(409).send({msg:"Rate already exists."});
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
        res.status(400).send({msg:"Please verify your request includes your rate"});
        return;
    }
})

// delete movie admin delete

app.delete("/:id", (req, res) => {

    let sql = `DELETE FROM movies WHERE id = ${req.params.id};`

    con.query(sql, async (result, fields) => {
        if (result) {
            res.json({success: true});
            }

    });
 });

module.exports = app;