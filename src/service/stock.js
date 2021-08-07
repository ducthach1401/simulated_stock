const fetch = require('node-fetch');

module.exports.getStocks = async () => {
    const url = 'https://banggia.cafef.vn/stockhandler.ashx';
    const stocks = await fetch(url).then(res => res.json());
    let result = {};
    for (let stock of stocks){
        result[stock.a] = stock.b * 1000;
    }
    return result;
}
