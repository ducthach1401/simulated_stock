const Command = require("../model/model.command").Command;
const ServiceUser = require("./service.user");
const User = require("../model/model.user").User;

module.exports.setCommand = async(data) => {
    try {
        data["daySet"] = Date.now(); 
        const user = await User.findOne({
            username: data.username
        });
        if (data.option == 'purchase') {
            if ((data.price * data.weight) > user.money) {
                return {
                    message: "Fail"
                }
            }
            user.money -= data.price * data.weight;
            await user.save();
        } else {
            let flag = 1;
            for (let stock of user.stockCode){
                if (stock.code == data.code){
                    if (stock.weight >= data.weight){
                        flag = 0;
                        stock.weight -= data.weight;
                        await user.save();
                    }
                }
            }
            if (flag) {
                return {
                    message: "Fail"
                }
            }
        }
        const command = new Command(data);
        await command.save();
        return {
            message: "Success"
        }
    } catch (error) {
        throw error;
    }
}

module.exports.deleteCommand = async (data) => {
    try {
        const result = await Command.findOne(data);
        if (!result){
            return {
                message: "Fail"
            }
        }
        const user = await User.findOne({
            username: data.username
        });
        if (result.option == 'purchase') {
            user.money += result.price * result.weight;
        }
        else {
            for (let stock of user.stockCode){
                if (stock.code == result.code){
                    stock.weight += result.weight;
                }
            }
        }
        await user.save();
        await Command.deleteOne(data);
        return {
            message: "Success"
        }
    } catch (error) {
        throw error;
    }
}

module.exports.updateCommand = async (command, data) => {
    try {
        const result = await Command.updateOne(command, data);
        if (result.n == 0){
            return {
                message: "Fail"
            }
        }
        return {
            message: "Success"
        }
    } catch (error) {
        throw error;
    }
}

module.exports.execCommand = async (stock) => {
    try {
        const commands = await Command.find({
            isSuccess: false
        });
        for (let command of commands){
            let code = command.code;
            let username = {
                username: command.username
            }
            let data = {
                code: code,
                weight: command.weight,
                cost: stock[code][3],
                dateBuy: Date.now()
            }
            if (stock[code][3] <= command.price) {
                if (command.option == 'purchase'){
                    this.deleteCommand(command);
                    let result = await ServiceUser.buyStock(username, data);
                    if (result.Money) {
                        await Command.updateOne(command, {
                            isSuccess: true
                        });
                    }
                }
            }
            if (stock[code][3] >= command.price){
                if (command.option == 'sell'){
                    this.deleteCommand(command);
                    await user.save();
                    let result = await ServiceUser.sellStock(username, data);
                    if (result.money) {
                        await Command.updateOne(command, {
                            isSuccess: true
                        });
                    }
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports.clearCommand = async () => {
    try {
        const commands = await Command.find();
        for (let command of commands){
            if (command.isSuccess){
                const date = parseInt((Date.now() - command.daySet)/(24*3600*1000));;
                if (date >= 1){
                    await this.deleteCommand(command);
                }
            }
            else if (command.isUnlimited == false){
                const date = parseInt((Date.now() - command.daySet)/(24*3600*1000));;
                if (date >= 1){
                    await this.deleteCommand(command);
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports.getCommmand = async (username) => {
    try {
        const result = await Command.find(username);
        return {
            data: result
        }
    } catch (error) {
        throw error;
    }
}