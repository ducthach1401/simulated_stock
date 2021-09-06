const model = require('../model/model.user.js');
const { UserUSA, UserCoin } = require('../model/modelUSA.user.js');
const User = model.User;

module.exports.deleteUser = async (id) => {
    try {
        const data = await User.findOne(id);
        const result = await User.deleteOne(id);
        await UserUSA.deleteOne({
            username: data.username
        });
        await UserCoin.deleteOne({
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

module.exports.addUSD = async (id, money) => {
    try {
        let result = await UserUSA.updateOne(id, {
            $inc: {money: money.money}
        });
        result = await UserUSA.updateOne(id, {
            $inc: {capital: money.money}
        });
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.subUSD = async (id, money) => {
    try {
        let result = await UserUSA.updateOne(id, {$inc: {money: -money.money}});
        result = await UserUSA.updateOne(id, {$inc: {capital: -money.money}})
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.addUSDCoin = async (id, money) => {
    try {
        let result = await UserCoin.updateOne(id, {
            $inc: {money: money.money}
        });
        result = await UserCoin.updateOne(id, {
            $inc: {capital: money.money}
        });
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.subUSDCoin = async (id, money) => {
    try {
        let result = await UserCoin.updateOne(id, {$inc: {money: -money.money}});
        result = await UserCoin.updateOne(id, {$inc: {capital: -money.money}})
        return result;
    } catch (error) {
        throw error;
    }
}