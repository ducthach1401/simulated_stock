const express = require('express');
const router = express.Router();
const path = require('path');
const dirView = __dirname + '/../html'

router.get('/', function (req, res) {
        res.sendFile(path.resolve(dirView + '/home.html'));
});

module.exports = router