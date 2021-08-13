module.exports.infoUser = (model) => {
    return {
        name: model.name,
        money: model.money,
        stockCode: model.stockCode
    }
}

module.exports.infoUserRole = (model) => {
    return {
        _id: model.id,
        name: model.name,
        money: model.money,
        capital: model.capital,
        earning: model.earning,
        stockCode: model.stockCode,
        roleUser: model.roleUser
    }
}