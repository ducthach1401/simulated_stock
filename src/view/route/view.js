const express = require('express');
const router = express.Router();
const path = require('path');
const dirHtml = __dirname + '/../html'
const dirCss = __dirname + '/../css'

router.get('/', function(req, res) {
        if (req.cookies.access_token){
                res.sendFile(path.resolve(dirHtml + '/home.html'));
        }
        else {
                res.sendFile(path.resolve(dirHtml + '/login.html'));
        }
});

router.get('/register', function (req, res) {
        if (req.cookies.access_token){
                res.redirect("/");
        }
        else {
                res.sendFile(path.resolve(dirHtml + '/register.html'));
        }
});

router.get('/logout', function (req, res) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.redirect("/");
});

router.get('/information', function (req, res) {
        if (req.cookies.access_token){
                res.sendFile(path.resolve(dirHtml + '/home.html'));
        }
        else {
                res.redirect("/");
        }
})
module.exports = router