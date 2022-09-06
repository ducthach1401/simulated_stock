const User = require("../model/modelUSA.user").UserUSA;

module.exports.getUser = async (data) => {
  try {
    let user = await User.findOne(data);
    if (!user) {
      const newUser = new User(data);
      await newUser.save();
      user = await User.findOne(data);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.getUserAll = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.buyStock = async (id, data) => {
  try {
    data.capital = data.cost * data.weight;
    const user = await User.findOne(id);
    if (user.money >= data.capital) {
      let check = true;
      for (let stock of user.stockCode) {
        if (stock.code == data.code) {
          stock.capital += data.capital;
          stock.weight += data.weight;
          user.money -= data.capital;
          stock.dateBuy = data.dateBuy;
          check = false;
          await user.save();
          break;
        }
      }
      if (check) {
        await User.updateMany(id, {
          $push: { stockCode: data },
        });

        await User.updateMany(id, {
          $inc: { money: -data.capital },
        });
      }
      return { Money: user.money - data.capital };
    } else {
      return { Message: "Failed" };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.sellStock = async (id, data) => {
  try {
    data.capital = data.cost * data.weight * 0.999;
    const user = await User.findOne(id);
    for (let stock of user.stockCode) {
      if (stock.code == data.code) {
        if (stock.weight >= data.weight) {
          user.money += data.capital;
          user.earning +=
            (data.cost - stock.capital / stock.weight) * data.weight;
          stock.capital -= (stock.capital / stock.weight) * data.weight;
          stock.weight -= data.weight;
          await user.save();
          if (stock.weight == 0) {
            await User.updateOne(id, {
              $pull: { stockCode: { _id: stock._id } },
            });
          }
          return {
            money: user.money,
            earning: user.earning,
            weight: stock.weight,
          };
        } else {
          return {
            message: "KL failed",
            weight: stock.weight,
          };
        }
      }
    }
    return {
      message: "Not found code",
    };
  } catch (error) {
    throw error;
  }
};
