const model = require('../model/model.js');
const mongoose = require('mongoose');
const User = model.User;

module.exports.createUser = async (data) => {
    try {
        const newUser = new User(data);
        const result = await newUser.save();
        return {message: newUser._id};
    } catch (error) {
        return {message: 'Username exist'}
    }
}

module.exports.getAll = async() => {
    try {
        const result = await User.find();
        return result;
    } catch (error) {
        throw error;
    }
}
module.exports.getUser = async (id) => {
    try {
        const result = await User.findById(id);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.deleteUser = async (id) => {
    try {
        const result = await User.deleteOne(id);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.addMoney = async (id, money) => {
    try {
        const result = await User.updateOne(id, {$inc: {money: money.money}})
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.subMoney = async (id, money) => {
    try {
        const result = await User.updateOne(id, {$inc: {money: -money.money}})
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.buyStock = async (id, data) => {
    try {
        const moneyRequire = data.cost * data.weight;
        let moneyNew = -1;
        const result = await User.findOne(id, (err, docs) => {
            if (err) throw err;
            if (docs.money >= moneyRequire){
                User.updateOne(id, {$push: {stockCode: data}}, (err) => {
                    if (err) throw err;
                });
                docs.money -= moneyRequire;
                docs.save();
                moneyNew = docs.money;
            }
        });
        return {message: moneyNew};
    } catch (error) {
        throw error;
    }
}

module.exports.sellStock = async (id, data) => {
    try {
        console.log(data);
    } catch (error) {
        throw error;
    }
}




