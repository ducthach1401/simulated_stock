const express = require("express");
const router = express.Router();
const path = require("path");
const dirHtml = __dirname + "/../html";
const dirCss = __dirname + "/../css";

router.get("/", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/home.html"));
  } else {
    res.sendFile(path.resolve(dirHtml + "/login.html"));
  }
});

router.get("/USA", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/USA.html"));
  } else {
    res.sendFile(path.resolve(dirHtml + "/login.html"));
  }
});

router.get("/coin", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/coin.html"));
  } else {
    res.sendFile(path.resolve(dirHtml + "/login.html"));
  }
});

router.get("/leaderBoard", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/ranking.html"));
  } else {
    res.sendFile(path.resolve(dirHtml + "/login.html"));
  }
});

router.get("/register", function (req, res) {
  if (req.cookies.access_token) {
    res.redirect("/");
  } else {
    res.sendFile(path.resolve(dirHtml + "/register.html"));
  }
});

router.get("/logout", function (req, res) {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.clearCookie("exp");
  res.redirect("/");
});

router.get("/information", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/home.html"));
  } else {
    res.redirect("/");
  }
});

router.get("/changeName", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/changeName.html"));
  } else {
    res.redirect("/");
  }
});

router.get("/changePassword", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/changePassword.html"));
  } else {
    res.redirect("/");
  }
});

router.get("/admin", function (req, res) {
  if (req.cookies.access_token) {
    res.sendFile(path.resolve(dirHtml + "/admin.html"));
  } else {
    res.redirect("/");
  }
});

module.exports = router;
