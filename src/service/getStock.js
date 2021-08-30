const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports.getStocks = async () => {
    try {
        const url = 'https://banggia.cafef.vn/stockhandler.ashx';
        const stocks = await fetch(url).then(res => res.json());
        let result = {};
        for (let stock of stocks){
            let cost;
            if (isNaN(stock.o) || (stock.o <= 0)){
                if (!isNaN(stock.l) && (stock.l > 0)){
                    cost = stock.l * 1000;
                }
                else if (!isNaN(stock.q) && (stock.q > 0)){
                    cost = stock.q * 1000;
                }
                else {
                    cost = stock.b * 1000;
                }
            }
            else {
                cost = stock.o * 1000;
            }
            result[stock.a] = [Math.round(stock.b * 1000), Math.round(stock.c * 1000), Math.round(stock.d*1000), cost]; 
        }
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports.stockUSA = async () => {
    try {
        const url = 'https://vn.investing.com/equities/StocksFilter?noconstruct=1&smlID=595&sid=&tabletype=price&index_id=166&fbclid=IwAR00mIbpYshOV9eq2UucYebWAsIQ-PQT6yiX1Lm3b_1DVwKpWDZZaRHUoVE';
        let data = await fetch(url).then(res => res.text());
        const $ = cheerio.load(data);
        let result = {}
        let table = $('#cross_rate_markets_stocks_1 tbody tr').each((index, element) => {
            let id = $(element).attr('id').replace('pair_', '');
            let name = $(element).find('td a').text();
            let lastPrice = parseFloat($(element).find('.pid-' + id + '-last').text().replace(',',''));
            let highPrice = parseFloat($(element).find('.pid-' + id + '-high').text().replace(',',''));
            let lowPrice = parseFloat($(element).find('.pid-' + id + '-low').text().replace(',',''));
            let tc = Math.round((highPrice + lowPrice) / 2 * 100) /100
            result[name] = [tc, highPrice, lowPrice, lastPrice];
        });
        return result;
    } catch (error) {
        throw error;
    }
}

