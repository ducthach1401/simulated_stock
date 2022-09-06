const express = require("express");

module.exports = async function authorAdmin(req, res, next) {
  const isAdmin = res.locals.roleUser;
  if (isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
};
