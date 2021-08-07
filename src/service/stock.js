const cheerio = require('cheerio');
const request = require('request');

module.exports.getStocks = async () =>{
    request({
        method: 'GET',
        url: 'https://banggia.cafef.vn/stockhandler.ashx'
    }, (err, res, body) => {
        if (err) return console.error(err);
        const data = JSON.parse(body);
        let list = {};
        for (let stock of data){
            list[stock.a] = stock.b;
        }
    });
}    