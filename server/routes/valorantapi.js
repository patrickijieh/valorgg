const express = require('express');
const router = express.Router();

let apiUrl = process.env.API_URL;

router.get('/val-account-data/:gameId/:gameTag', async (req, res) => {
    const headers = {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    res.send( await fetch(apiUrl + req.params.gameId + "/" + req.params.gameTag, { headers })
    .then( (response) => response.json() ) );
});

module.exports = router;