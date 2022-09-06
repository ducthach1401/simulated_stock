module.exports.infoUser = (model) => {
  return {
    name: model.name,
    money: model.money,
    stockCode: model.stockCode,
  };
};

module.exports.infoUserRole = (model) => {
  return {
    _id: model.id,
    name: model.name,
    money: model.money,
    capital: model.capital,
    earning: model.earning,
    stockCode: model.stockCode,
    roleUser: model.roleUser,
  };
};

module.exports.divSchema = (model) => {
  return {
    code: model.code,
    date: model.date,
    ratio: model.ratio,
    isDiv: model.isDiv,
  };
};

module.exports.infoCommand = (model) => {
  return {
    _id: model.id,
    command: model.command,
    code: model.code,
    price: model.price,
    weight: model.weight,
    option: model.option,
    isUnlimited: model.isUnlimited,
    isSuccess: model.isSuccess,
    dateSet: model.daySet,
  };
};
