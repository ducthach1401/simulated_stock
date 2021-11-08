const service = require('../service/service.command');

module.exports.setCommand = async (req, res) => {
    const data = {
        username: res.locals.username,
        ...req.body,
    }
    const result = await service.setCommand(data);
    res.json(result);
}

module.exports.deleteCommand = async (req, res) => {
    const data = {
        username: res.locals.username,
        ...req.body,
    }
    const result = await service.deleteCommand(data);
    res.json(result);
}


module.exports.updateCommand = async (req, res) => {
    const data = {
        username: res.locals.username,
        ...req.body,
    }

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
    const result = await service.deleteCommand(username);
    res.json(result);
}