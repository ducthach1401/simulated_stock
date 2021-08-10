const service = require('../service/service.js');
const { getStocks } = require('../service/stock.js');

module.exports.createUser = async (req, res) => {
    const data = req.body;
    const result = await service.createUser(data);
    res.json(result);
}

module.exports.getAllUser = async (req, res) => {
    const result = await service.getAll();
    res.json(result);
}

module.exports.getUser = async (req, res) => {
    const id = {_id: req.params.id};
    const result = await service.getUser(id);
    res.json(result);
}

module.exports.updateUser = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const data = req.body;
    const result = await service.updateUser(id, data);
    res.json(result);
}

module.exports.deleteUser = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const result = await service.deleteUser(id);
    res.json(result);
}

module.exports.buyStock = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const cost = await getStocks();
    const data = {
        ...req.body,
        dateBuy: Date.now(),
        cost: cost[req.body.code]
    }
    const result = await service.buyStock(id, data);
    res.json(result);
}

module.exports.sellStock = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const cost = await getStocks();
    const data = {
        ...req.body,
        cost: cost[req.body.code]
    }
    const result = await service.sellStock(id, data);
    res.json(result);
}

module.exports.addMoney = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const data = req.body;
    const result = await service.addMoney(id, data);
    res.json(result);
}

module.exports.subMoney = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const data = req.body;
    const result = await service.subMoney(id, data);
    res.json(result);
}

module.exports.login = async (req, res) => {
    const data = req.body;
    const token = await service.login(data);
    if (token) res.status(200).json(token);
    else res.status(401).json({message: "Auth failed"});
}

module.exports.refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const accessToken = await this.userService.regenerateAccessToken(refreshToken);
    if (accessToken) res.status(200).json(accessToken);
    else res.sendStatus(403);
}

module.exports.getCost = async (req, res) => {
    const cost = await getStocks();
    const result = {
        code: req.query.code,
        cost: cost[req.query.code]
    }
    res.json(result);
}

