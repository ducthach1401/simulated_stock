const cheerio = require('cheerio');
const request = require('request');

module.exports.getStocks = async () =>{
    request({
        method: 'GET',
        url: 'https://banggia.cafef.vn/stockhandler.ashx'
    }, async (err, res, body) => {
        if (err) return console.error(err);
        const data = JSON.parse(body);
        let list = {};
        for await (let stock of data){
            list[stock.a] = stock.b;
        }
        return list;
    });
}