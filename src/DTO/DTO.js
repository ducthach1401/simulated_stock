const Joi = require('joi');

module.exports.createUserSchema = Joi.object({
    name: Joi.string().required().max(20),
    username: Joi.string().required().max(20),
    password: Joi.string().required()
});

module.exports.updateUserSchema = Joi.object({
    name: Joi.string().required().max(20),
});

module.exports.buystockSchema = Joi.object({
    code: Joi.string().required(),
    weight: Joi.number().required()
});

module.exports.sellstockSchema = Joi.object({
    code: Joi.string().required(),
    weight: Joi.number().required()
});

module.exports.subMoneySchema = Joi.object({
    money: Joi.number().required()
});

module.exports.addMoneySchema = Joi.object({
    money: Joi.number().required()
});

module.exports.loginSchema = Joi.object({
    username: Joi.string().required().max(20),
    password: Joi.string().required()
});

module.exports.getCostSchema = Joi.object({
    code: Joi.string().required(),
});

module.exports.updatePasswordSchema = Joi.object({
    password: Joi.string().required(),
});