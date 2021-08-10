const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        res.locals.username = decoded.username;
        next();
    }
    catch(err) {
        res.sendStatus(403);
    }
}