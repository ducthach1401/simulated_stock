const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./src/route/route.user");
const View = require("./src/view/route/view");
const UserUSA = require("./src/route/route.stock");
const Admin = require("./src/route/router.admin");
const Coin = require("./src/route/route.coin");
const Command = require("./src/route/route.command");

const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + "/src/view/"));
app.use("/v1/user", User);
app.use("/v1/USA", UserUSA);
app.use("/v1/admin", Admin);
app.use("/v1/coin", Coin);
app.use("/v1/command", Command);
app.use("/", View);
app.listen(port, () => {
  console.log("Run Server http://localhost:8080");
});
