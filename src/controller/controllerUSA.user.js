const service = require("../service/getStock");
const serviceUSA = require('../service/serviceUSA.user');
const serializerUser = require('../serializer/user.serializer')
const serviceUser = require('../service/service.user');
var cost;
async function updateCost(){
    cost = await service.stockUSA();
}
updateCost();
setInterval(updateCost, 2000);

module.exports.getStockUSA = async (req, res) => {
    // const result = await service.stockUSA();
    res.json(cost);
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
            username: res.locals.username
        }
        // const cost = await service.stockUSA();
        const data = {
            ...req.body,
            cost: parseFloat(cost[req.body.code][3]),
            dateBuy: Date.now(),
        }
        const result = await serviceUSA.buyStock(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.sellStock = async (req, res) => {
    const check = await serviceUSA.getUser({
        username: res.locals.username
    });
    if (check){
        const id = {
            username: res.locals.username
        }
        // const cost = await service.stockUSA();
        const data = {
            ...req.body,
            cost: parseFloat(cost[req.body.code][3])
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