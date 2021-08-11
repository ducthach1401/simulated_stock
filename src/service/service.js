const model = require('../model/model.js');
const mongoose = require('mongoose');
const User = model.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const factory = 10;

function hashPass(data) {
    try {
        data.password = bcrypt.hashSync(data.password, factory)
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports.createUser = async (data) => {
    try {
        data = hashPass(data);
        const newUser = new User(data);
        await newUser.save();
        return {message: newUser};
    } catch (error) {
        throw error;
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
module.exports.getUserbyinfo = async (username) => {
    try {
        const result = await User.findOne(username);
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

module.exports.updateUser = async (id, data) => {
    try {
        if (data.password){
            data = hashPass(data);
        }
        const result = await User.updateOne(id, data);
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
        let result = await User.updateOne(id, {
            $inc: {money: money.money}
        })
        result = await User.updateOne(id, {
            $inc: {capital: money.money}
        })
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
        data.capital = data.cost * data.weight;
        const user = await User.findOne(id);
        if (user.money >= data.capital){
            let check = true;
            for (let stock of user.stockCode){
                if (stock.code == data.code){
                    stock.capital += data.capital;
                    stock.weight += data.weight;
                    user.money -= data.capital;
                    stock.dateBuy = data.dateBuy;
                    check = false;
                    user.save();
                    break;
                }
            }
            if (check){
                await User.updateMany(id, {
                    $push: {stockCode: data},
                })

                await User.updateMany(id, {
                    $inc: {money : -data.capital}
                })
            }
            return {Money: user.money - data.capital}
        }
        else {
            return {Message: "Failed"}
        }
       
    } catch (error) {
        throw error;
    }
}

module.exports.sellStock = async (id, data) => {
    try {
        data.capital = data.cost * data.weight;
        const user = await User.findOne(id);
        for (let stock of user.stockCode){
            if (stock.code == data.code){
                if (stock.weight >= data.weight){
                    user.money += data.capital;
                    user.earning += (data.cost -(stock.capital / stock.weight)) * data.weight;
                    stock.capital -= (stock.capital / stock.weight) * data.weight;
                    stock.weight -= data.weight;
                    await user.save();
                    if (stock.weight == 0){
                        await User.updateOne(id, {$pull: {stockCode: {_id: stock._id}}})
                    }
                    return {
                        money: user.money,
                        earning: user.earning,
                        weight: stock.weight
                    }
                }
                else {
                    return {
                        message: "KL failed",
                        weight: stock.weight
                    }
                }
            }
        }
        return {
            message: "Not found code"
        }
    } catch (error) {
        throw error;
    }
}

module.exports.login = async(data) =>{
    try {
        const user = await User.findOne({username: data.username})
        if (!user){
            return {
                message: "User wrong"
            }
        }
        const result = bcrypt.compareSync(data.password, user.password);
        if (result){
            const payload = {
                _id: user._id,
                username: user.username
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6h'});
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            user.refreshToken = refreshToken;
            user.save();
            return {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
        else {
            return {
                message: "Password wrong"
            }
        }
    } catch (error) {
        throw error;   
    }
}

module.exports.regenerateAccessToken = async (refreshToken) => {
    try {
        const user = await User.find({refreshToken: refreshToken});
        if (user) {
            const payload = {
                username: user.username
            }
            const user = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6h'});
            return {
                accessToken: accessToken
            }
        }
        else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}