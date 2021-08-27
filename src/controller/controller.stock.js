const service = require("../service/stock");

module.exports.getStockUSA = async (req, res) => {
    const result = await service.stockUSA();
    res.json(result);
}