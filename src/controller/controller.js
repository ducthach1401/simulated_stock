const service = require('../service/service.js');
const { getStocks, test } = require('../service/stock.js');
const serializerUser = require('../serializer/user.serializer')

module.exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await service.createUser(data);
        res.json({success: true});
    } catch (error) {
        res.json({message: "Username Exist"})
    }
}

module.exports.getAllUser = async (req, res) => {
    let result = await service.getAll();
    result = result.map((element) => serializerUser.infoUser(element));
    res.json(result);
}

module.exports.getAll = async (req, res) => {
    if (res.locals.roleUser){
        let result = await service.getAll();
        result = result.map((element) => serializerUser.infoUserRole(element));
        res.json(result);
    }
    else {
        res.json({error: 'Deny'})
    }
}

module.exports.getUser = async (req, res) => {
    const id = {_id: req.params.id};
    const result = await service.getUser(id);
    res.json(serializerUser.infoUser(result));
}

module.exports.getUserbyInfo = async (req, res) => {
    const username = {
        username: res.locals.username
    }
    const result = await service.getUserbyinfo(username);
    res.json(serializerUser.infoUserRole(result));
}

module.exports.updateUser = async (req, res) => {
    if (req.params.id == res.locals._id){
        const id = {
            _id: req.params.id
        }
        const data = req.body;
        const result = await service.updateUser(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'})
    }
}

module.exports.deleteUser = async (req, res) => {
    if (res.locals.roleUser){
        const id = {
            _id: req.params.id
        }
        const result = await service.deleteUser(id);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.buyStock = async (req, res) => {
    if (req.params.id == res.locals._id){
        const id = {
            _id: req.params.id
        }
        const data = {
            ...req.body,
            dateBuy: Date.now(),
        }
        const result = await service.buyStock(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.sellStock = async (req, res) => {
    if (req.params.id == res.locals._id){
        const id = {
            _id: req.params.id
        }
        const data = {
            ...req.body,
        }
        const result = await service.sellStock(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'});
    }
}

module.exports.addMoney = async (req, res) => {
    if (res.locals.roleUser){
        const id = {
            _id: req.params.id
        }
        const data = req.body;
        const result = await service.addMoney(id, data);
        res.json(result);
    }
    else {
        res.json({error: 'Deny'})
    }
}

module.exports.subMoney = async (req, res) => {
    if (res.locals.roleUser){
        const id = {
            _id: req.params.id
        }
        const data = req.body;
        const result = await service.subMoney(id, data);
        res.json(result);
    }
    else{
        res.json({error: 'Deny'})
    }
}

module.exports.login = async (req, res) => {
    const data = req.body;
    const token = await service.login(data);
    if (token.accessToken) {
        res.cookie('access_token', token.accessToken, {
            httpOnly: true,
            //secure: true;
        });
        res.cookie('refresh_token', token.refreshToken, {
            httpOnly: true,
            //secure: true;
        });
        res.status(200).json({success: "ok"});
    }
    else res.status(401).json({message: "Auth failed"});
}

module.exports.refresh = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    const token = await service.regenerateAccessToken(refreshToken);
    if (token) {
        res.cookie('access_token',token.accessToken, {
        httpOnly: true,
        });
        res.status(200).json({success: 'ok'});
    }
    else res.sendStatus(403);
}

module.exports.getCost = async (req, res) => {
    const cost = await getStocks();
    const result = {
        code: req.query.code,
        cost: cost[req.query.code][3]
    }
    res.json(result);
}

module.exports.getAllStock = async (req, res) => {
    const result = await getStocks();
    res.json(result);
} 

