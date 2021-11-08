const service = require('../service/service.command');
const serializerUser = require('../serializer/user.serializer');

module.exports.setCommand = async (req, res) => {
    const data = {
        username: res.locals.username,
        ...req.body,
    }
    data.code = data.code.toUpperCase();
    const result = await service.setCommand(data);
    res.json(result);
}

module.exports.deleteCommand = async (req, res) => {
    const data = {
        _id: req.params.id
    }
    const result = await service.deleteCommand(data, 1);
    res.json(result);
}


module.exports.updateCommand = async (req, res) => {
    const data = {
        username: res.locals.username,
        ...req.body,
    }
    data.code = data.code.toUpperCase();
    const id = {
        _id: req.params.id
    }
    const result = await service.updateCommand(id, data);
    res.json(result);
}

module.exports.getCommand = async (req, res) =>{
    const username = {
        username: res.locals.username,
    }
    let result = await service.getCommmand(username);
    result.data = result.data.map((element) => serializerUser.infoCommand(element));
    res.json(result);
}