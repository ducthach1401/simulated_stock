const model = require('../model/model.user.js');
const mongoose = require('mongoose');
const { UserUSA } = require('../model/modelUSA.user.js');
const User = model.User;

module.exports.deleteUser = async (id) => {
    try {
        const data = await User.findOne(id);
        const result = await User.deleteOne(id);
        await UserUSA.deleteOne({
            username: data.username
        });
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.addMoney = async (id, money) => {
    try {
        let result = await User.updateOne(id, {
            $inc: {money: money.money}
        });
        result = await User.updateOne(id, {
            $inc: {capital: money.money}
        });
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.subMoney = async (id, money) => {
    try {
        let result = await User.updateOne(id, {$inc: {money: -money.money}});
        result = await User.updateOne(id, {$inc: {capital: -money.money}})
        return result;
    } catch (error) {
        throw error;
    }
}