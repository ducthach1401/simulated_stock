const service = require('../service/service.js')

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
    const id = req.params.id;
    const result = await service.getUser(id);
    res.json(result);
}

module.exports.getUser = async (req, res) => {
    const id = req.params.id;
    const result = await service.deleteUser(id);
}

module.exports.buyStock = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const data = {
        ...req.body,
        dateBuy: Date.now()
    }
    const result = await service.buyStock(id, data);
    res.json(result);
}

module.exports.sellStock = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
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