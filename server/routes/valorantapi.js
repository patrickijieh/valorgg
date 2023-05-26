const express = require('express');
const router = express.Router();

const matchSanitizer = require('../matchdata');

let accountdataURL = process.env.ACCOUNTDATA_API_URL;
let matchdataURL = process.env.MATCHHISTORY_API_URL;

router.get('/val-account-data/:gameId/:gameTag', async (req, res) => {
    const headers = {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    res.send( await fetch(accountdataURL + req.params.gameId + "/" + req.params.gameTag, { headers })
    .then((response) => response.json()));
});

router.get('/val-account-data/matches/:gameId/:gameTag', async (req, res) => {
    const headers = {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    res.send(await fetch(matchdataURL + req.params.gameId + "/" + req.params.gameTag + "?filter=competitive", { headers })
    .then((response) => response.json())
    .then((data) => matchSanitizer(data)));
});

module.exports = router;