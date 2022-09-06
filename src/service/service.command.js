const Command = require("../model/model.command").Command;
const ServiceUser = require("./service.user");
const User = require("../model/model.user").User;

module.exports.setCommand = async (data) => {
  try {
    data["daySet"] = Date.now();
    const user = await User.findOne({
      username: data.username,
    });
    if (data.option == "purchase") {
      if (data.price * data.weight > user.money) {
        return {
          message: "Money is not enough",
        };
      }
      user.money -= data.price * data.weight;
      await user.save();
    } else {
      let flag = 1;
      for (let stock of user.stockCode) {
        if (stock.code == data.code) {
          if (stock.weight >= data.weight) {
            flag = 0;
            stock.weight -= data.weight;
            await user.save();
          }
        }
      }
      if (flag) {
        return {
          message: "Can't find stock code in account",
        };
      }
    }
    const command = new Command(data);
    await command.save();
    return {
      message: "Success",
    };
  } catch (error) {
    throw error;
  }
};

module.exports.deleteCommand = async (data, option) => {
  try {
    const result = await Command.findOne(data);
    if (!result) {
      return {
        message: "Fail",
      };
    }
    const user = await User.findOne({
      username: result.username,
    });
    if (!result.isSuccess) {
      if (result.option == "purchase") {
        user.money += result.price * result.weight;
      } else {
        for (let stock of user.stockCode) {
          if (stock.code == result.code) {
            stock.weight += result.weight;
          }
        }
      }
      await user.save();
    }

    if (option == 1) {
      await Command.deleteOne(data);
    }
    return {
      message: "Success",
    };
  } catch (error) {
    throw error;
  }
};

module.exports.updateCommand = async (command, data) => {
  try {
    const result = await Command.updateOne(command, data);
    if (result.n == 0) {
      return {
        message: "Fail",
      };
    }
    return {
      message: "Success",
    };
  } catch (error) {
    throw error;
  }
};

module.exports.execCommand = async (stock) => {
  try {
    const commands = await Command.find({
      isSuccess: false,
    });
    for (let command of commands) {
      let code = command.code;
      let username = {
        username: command.username,
      };
      if (!(code in stock)) {
        await this.deleteCommand(command, 1);
        return;
      } else {
        let data = {
          code: code,
          weight: command.weight,
          cost: stock[code][3],
          dateBuy: Date.now(),
        };
        if (stock[code][3] <= command.price) {
          if (command.option == "purchase") {
            await this.deleteCommand(command, 0);
            let result = await ServiceUser.buyStock(username, data);
            if (result.Money) {
              await Command.updateOne(command, {
                price: stock[code][3],
                isSuccess: true,
              });
            }
          }
        }
        if (stock[code][3] >= command.price) {
          if (command.option == "sell") {
            await this.deleteCommand(command, 0);
            let result = await ServiceUser.sellStock(username, data);
            if (result.money) {
              await Command.updateOne(command, {
                price: stock[code][3],
                isSuccess: true,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports.clearCommand = async () => {
  try {
    const commands = await Command.find();
    for (let command of commands) {
      if (command.isSuccess) {
        const date = parseInt(
          (Date.now() - command.daySet) / (24 * 3600 * 1000)
        );
        if (date >= 1) {
          await Command.deleteOne(command);
        }
      } else if (command.isUnlimited == false) {
        const date = parseInt(
          (Date.now() - command.daySet) / (24 * 3600 * 1000)
        );
        if (date >= 1) {
          await Command.deleteOne(command);
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports.getCommmand = async (username) => {
  try {
    const result = await Command.find(username);
    return {
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
