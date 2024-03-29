const service = require("../service/service.user.js");
const {
  getStocks,
  getVNIndex,
  updateDividend,
  execDividend,
  getStockinssi,
} = require("../service/getStock.js");
const serializerUser = require("../serializer/user.serializer");
const { clearCommand, execCommand } = require("../service/service.command.js");

var cost;
var checkCommand = 0;
async function updateCost() {
  const options1 = {
    timeZone: "Asia/Ho_Chi_Minh",
    timeZoneName: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const options2 = {
    timeZone: "Asia/Ho_Chi_Minh",
    timeZoneName: "short",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  const today = new Date();
  const time = today.toLocaleTimeString("vi-VN", options1).split(" ")[0].trim();
  const dateEng = today
    .toLocaleDateString("en-US", options2)
    .split(",")[0]
    .trim();
  const hour = parseInt(time.split(":")[0]);
  const weekday = parseInt(new Date(dateEng).getDay());

  cost = await getStocks();
  if (checkCommand != 0) {
    checkCommand++;
    if (checkCommand >= 2) {
      checkCommand = 0;
    }
    return;
  }
  if (weekday != 0 && weekday != 6) {
    if (hour >= 9 && hour <= 14) {
      checkCommand = 1;
      await execCommand(cost);
      checkCommand = 0;
    }
  }
}
updateCost();
execDividend();
updateDividend();
clearCommand();

setInterval(updateDividend, 7200000);
setInterval(execDividend, 14400000);
setInterval(updateCost, 5000);
setInterval(clearCommand, 7200000);

module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await service.createUser(data);
    res.json({ success: true });
  } catch (error) {
    res.json({ message: "Username Exist" });
  }
};

module.exports.getAllUser = async (req, res) => {
  let result = await service.getAll();
  result = result.map((element) => serializerUser.infoUser(element));
  res.json(result);
};

module.exports.getUser = async (req, res) => {
  const id = { _id: req.params.id };
  const result = await service.getUser(id);
  res.json(serializerUser.infoUser(result));
};

module.exports.getUserbyInfo = async (req, res) => {
  const username = {
    username: res.locals.username,
  };
  const result = await service.getUserbyinfo(username);
  res.json(serializerUser.infoUserRole(result));
};

module.exports.updateUser = async (req, res) => {
  const id = {
    _id: res.locals._id,
  };
  const data = req.body;
  const result = await service.updateUser(id, data);
  res.json(result);
};

module.exports.buyStock = async (req, res) => {
  const id = {
    _id: res.locals._id,
  };
  // const cost = await getStocks();
  const data = {
    ...req.body,
    cost: parseInt(cost[req.body.code][3]),
    dateBuy: Date.now(),
  };
  const result = await service.buyStock(id, data);
  res.json(result);
};

module.exports.sellStock = async (req, res) => {
  const id = {
    _id: res.locals._id,
  };
  // const cost = await getStocks();
  const data = {
    ...req.body,
    cost: parseInt(cost[req.body.code][3]),
  };

  const result = await service.sellStock(id, data);
  res.json(result);
};

module.exports.login = async (req, res) => {
  const data = req.body;
  const token = await service.login(data);
  if (token.accessToken) {
    res.cookie("access_token", token.accessToken, {
      httpOnly: true,
      //secure: true;
    });
    res.cookie("refresh_token", token.refreshToken, {
      httpOnly: true,
      //secure: true;
    });
    res.status(200).json({ success: "ok" });
  } else res.status(401).json({ message: "Auth failed" });
};

module.exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  const token = await service.regenerateAccessToken(refreshToken);
  if (token) {
    res.cookie("access_token", token.accessToken, {
      httpOnly: true,
    });
    res.status(200).json({ success: "ok" });
  } else {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.sendStatus(200);
  }
};

module.exports.getCost = async (req, res) => {
  // const cost = await getStocks();
  const result = {
    code: req.query.code,
    cost: cost[req.query.code][3],
  };
  res.json(result);
};

module.exports.getAllStock = async (req, res) => {
  // const result = await getStocks();
  res.json(cost);
};

module.exports.getIndex = async (req, res) => {
  const result = await getVNIndex();
  res.json(result);
};

module.exports.getDiv = async (req, res) => {
  const username = {
    username: res.locals.username,
  };
  let result = await service.getDiv(username);
  result = result.map((element) => serializerUser.divSchema(element));
  res.json(result);
};
