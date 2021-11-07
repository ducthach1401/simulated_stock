const Command = require("../model/model.command").Command;
const ServiceUser = require("./service.user");

module.exports.setCommand = async(data) => {
    try {
        data["daySet"] = Date.now(); 
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
        const result = await Command.deleteOne(data);
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
            if (stock[code][3] == command.price) {
                let username = {
                    username: command.username
                }
                let data = {
                    code: code,
                    weight: command.weight,
                    cost: command.price,
                    dateBuy: Date.now()
                }
                if (command.option == 'purchase'){
                    let result = await ServiceUser.buyStock(username, data);
                    if (result.Money) {
                        await Command.updateOne(command, {
                            isSuccess: true
                        });
                    }
                }
                else {
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
                await Command.deleteOne(command);
            }
            else if (command.isUnlimited == false){
                const date = parseInt((Date.now() - command.daySet)/(24*3600*1000));;
                if (date >= 1){
                    await Command.deleteOne(command);
                }
            }
        }
    } catch (error) {
        throw error;
    }
}