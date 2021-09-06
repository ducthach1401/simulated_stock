const service = require("../service/getStock");
const serviceCoin = require('../service/serviceCoin.user');
const serializerUser = require('../serializer/user.serializer')
const serviceUser = require('../service/service.user');
var cost;
async function updateCost(){
    cost = await service.getCoin();
}
updateCost();
setInterval(updateCost, 5000);

module.exports.getCoin = async (req, res) => {
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
    const result = await serviceCoin.getUser(data);
    res.json(serializerUser.infoUserRole(result));
}

module.exports.buyCoin = async (req, res) => {
    const check = await serviceCoin.getUser({
        username: res.locals.username
    });
    if (check){
        const id = {
            username: res.locals.username
        }
        // const cost = await service.stockUSA();
        const data = {
            ...req.body,
            cost: parseFloat(cost[req.body.code][1]),
            dateBuy: Date.now(),
        }
        const result = await serviceCoin.buyCoin(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.sellCoin = async (req, res) => {
    const check = await serviceCoin.getUser({
        username: res.locals.username
    });
    if (check){
        const id = {
            username: res.locals.username
        }
        // const cost = await service.stockUSA();
        const data = {
            ...req.body,
            cost: parseFloat(cost[req.body.code][1])
        }
        const result = await serviceCoin.sellCoin(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.getUserAll = async (req, res) => {
    let result = await serviceCoin.getUserAll();
    result = result.map((element) => serializerUser.infoUser(element));
    res.json(result);
}