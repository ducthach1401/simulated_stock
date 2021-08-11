const express = require('express');
const router = express.Router();
const path = require('path');
const dirHtml = __dirname + '/../html'
const dirCss = __dirname + '/../css'

router.get('/', function(req, res) {
        res.sendFile(path.resolve(dirHtml + '/home.html'));
});

router.get('/login', function (req, res) {
        res.sendFile(path.resolve(dirHtml + '/login.html'));
});

router.get('/register', function (req, res) {
        res.sendFile(path.resolve(dirHtml + '/register.html'));
});

module.exports = router