const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = req.cookies.access_token;
    try {
        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        res.locals.username = decoded.username;
        res.locals._id = decoded._id;
        res.locals.roleUser = decoded.roleUser;
        next();
    }
    catch(err) {
        res.sendStatus(403);
    }
}