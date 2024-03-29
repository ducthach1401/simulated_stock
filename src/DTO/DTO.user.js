const Joi = require("joi");

module.exports.createUserSchema = Joi.object({
  name: Joi.string().required().max(20),
  username: Joi.string().required().max(20),
  password: Joi.string().required(),
});

module.exports.updateUserSchema = Joi.object({
  name: Joi.string().required().max(20),
});

module.exports.buystockSchema = Joi.object({
  code: Joi.string().required(),
  weight: Joi.number().required().integer().min(1),
});

module.exports.sellstockSchema = Joi.object({
  code: Joi.string().required(),
  weight: Joi.number().required().integer().min(1),
});

module.exports.subMoneySchema = Joi.object({
  money: Joi.number().required(),
});

module.exports.addMoneySchema = Joi.object({
  money: Joi.number().required(),
});

module.exports.loginSchema = Joi.object({
  username: Joi.string().required().max(20),
  password: Joi.string().required(),
});

module.exports.getCostSchema = Joi.object({
  code: Joi.string().required(),
});

module.exports.updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
});

module.exports.buyCoinSchema = Joi.object({
  code: Joi.string().required(),
  weight: Joi.number().required().min(0.001),
});

module.exports.sellCoinSchema = Joi.object({
  code: Joi.string().required(),
  weight: Joi.number().required().min(0.001),
});

module.exports.setCommandSchema = Joi.object({
  command: Joi.string().required().min(2),
  code: Joi.string().required().min(3),
  price: Joi.number().integer().required().min(1000),
  weight: Joi.number().integer().required().min(1),
  isUnlimited: Joi.boolean().required(),
  option: Joi.string().required().valid("sell", "purchase"),
});
