const service = require("../service/stock");
const serviceUSA = require('../service/serviceUSA');
const serializerUser = require('../serializer/user.serializer')
const serviceUser = require('../service/service');
module.exports.getStockUSA = async (req, res) => {
    const result = await service.stockUSA();
    res.json(result);
}

module.exports.getUser = async (req, res) => {
    const dataUser = await serviceUser.getUserbyinfo({
        username: res.locals.username
    });
    const data = {
        name: dataUser.name,
        username: res.locals.username
    }
    const result = await serviceUSA.getUser(data);
    res.json(serializerUser.infoUserRole(result));
}

module.exports.buyStock = async (req, res) => {
    const check = await serviceUSA.getUser({
        username: res.locals.username
    });
    if (check){
        const id = {
            _id: req.params.id
        }
        const data = {
            ...req.body,
            dateBuy: Date.now(),
        }
        const result = await serviceUSA.buyStock(id, data);
        res.json(result);
    }
    else {
        console.log(req.params.id);
        res.json({error: 'Deny'});
    }
}

module.exports.sellStock = async (req, res) => {
    const check = await serviceUSA.getUser({
        username: res.locals.username
    });
    if (check){
        const id = {
            _id: req.params.id
        }
        const data = {
            ...req.body,
        }
        const result = await serviceUSA.sellStock(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.getUserAll = async (req, res) => {
    const result = await serviceUSA.getUserAll();
    res.json(serializerUser.infoUser(result));
}