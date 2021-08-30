const serializerUser = require('../serializer/user.serializer')
const serviceAdmin = require('../service/service.admin')
const service = require('../service/service.user')

module.exports.getAll = async (req, res) => {
    let result = await service.getAll();
    result = result.map((element) => serializerUser.infoUserRole(element));
    res.json(result);
}

module.exports.deleteUser = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const result = await serviceAdmin.deleteUser(id);
    res.json(result);
}

module.exports.addMoney = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const data = req.body;
    const result = await serviceAdmin.addMoney(id, data);
    res.json(result);
}

module.exports.subMoney = async (req, res) => {
    const id = {
        _id: req.params.id
    }
    const data = req.body;
    const result = await serviceAdmin.subMoney(id, data);
    res.json(result);
}