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

module.exports.getVNIndex = async () =>{
    try {
        const url = 'https://banggia.cafef.vn/stockhandler.ashx?index=true';
        let data = await fetch(url).then(res => res.json());
        return {
            name: 'VN-Index',
            price: data[1]['index'],
            change: data[1]['change'],
            prechange: data[1]['percent']
        }
    } catch (error) {
        throw error;
    }
}

module.exports.getCoin = async () => {
    try {
        const url = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=200&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH&cryptoType=coins&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,volume_7d,volume_30d&tagSlugs=';
        let data = await fetch(url).then(res => res.json());
        data = data.data.cryptoCurrencyList;
        const result = {};
        let price;
        let percent1h;
        let percent24h;
        for (let i of data){
            if (i.quotes[2].price > 0.0001){
                price = Math.round(i.quotes[2].price * 10000) / 10000
            }
            else {
                price = i.quotes[2].price;
            }
            percent1h = Math.round(i.quotes[2].percentChange1h * 1000) / 1000;
            percent24h = Math.round(i.quotes[2].percentChange24h * 1000) / 1000;

            result[i.symbol] = [i.name,price, percent1h, percent24h]; 
        }
        return result;
    } catch (error) {
        throw error; 
    }
}