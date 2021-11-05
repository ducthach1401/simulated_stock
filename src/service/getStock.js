const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const User = require('../model/model.user').User;
const Div = require('../model/model.div').Div;

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

module.exports.getDividend = async (code) => {
    try {
        const urlDividend = 'https://finfo-api.vndirect.com.vn/v4/events?q=locale:VN~code:'+ code +'~type:dividend~effectiveDate:gte:2021-10-18&sort=effectiveDate:asc&size=20&page=1';
        let data = await fetch(urlDividend).then(res => res.json());
        data = data.data;
        let result = [];
        for (let code of data){
            let date = code.effectiveDate.split('-').reverse().join('/');
            const temp = [date, [code.dividend]];
            result.push(temp);
        }

        const urlKinddiv = 'https://finfo-api.vndirect.com.vn/v4/events?q=locale:VN~code:'+ code +'~type:kinddiv~effectiveDate:gte:2021-10-18&sort=effectiveDate:asc&size=20&page=1';
        data = await fetch(urlKinddiv).then(res => res.json());
        data = data.data;
        for (let code of data){
            let date = code.effectiveDate.split('-').reverse().join('/');
            const temp = [date, [100, code.ratio]];
            result.push(temp);
        }

        const urlStockDiv = 'https://finfo-api.vndirect.com.vn/v4/events?q=locale:VN~code:'+ code +'~type:stockdiv~effectiveDate:gte:2021-10-18&sort=effectiveDate:asc&size=20&page=1';
        data = await fetch(urlStockDiv).then(res => res.json());
        data = data.data;
        for (let code of data){
            let date = code.effectiveDate.split('-').reverse().join('/');
            const temp = [date, [100, code.ratio]];
            result.push(temp);
        }
        return result;
    } catch (error) {
        throw error;
    }
}
module.exports.updateDividend = async (username) => {
    try {
        const users = await User.find(username);
        for (let user of users){
            for (let stock of user.stockCode){
                const dividend = await this.getDividend(stock.code);
                for (let div of dividend){
                    const data = {
                        username: user.username,
                        code: stock.code,
                        date: div[0],
                        ratio: div[1]
                    }
                    const check = await Div.findOne(data);
                    if (check == null){
                        const saveData = new Div(data);
                        await saveData.save();
                    }
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports.execDividend = async () => {
    try {
        const users = await User.find();
        for (let user of users){
            const dividend = await Div.find({
                username: user.username,
                isDiv: false
            });
            for (let stock of user.stockCode){
                const date = stock.dateBuy;
                const dateBuy = Date.parse(date);
                for (let div of dividend){
                    if (stock.code == div.code){
                        let dateDiv = div.date.split('/');
                        dateDiv = dateDiv[1] + ' ' + dateDiv[0] + ' ' + dateDiv[2];
                        dateDiv = Date.parse(dateDiv);
                        if ((dateDiv - dateBuy > 0) && (Date.now() - dateDiv  > 0)) {
                            if (div.ratio.length == 1){
                                const costDiv = stock.weight * div.ratio[0];
                                const earning = user.earning + costDiv;
                                const money = user.money + costDiv;
                                const captitalStock = stock.capital - costDiv;
                                user.money = money;
                                user.earning = earning;
                                stock.capital = captitalStock;
                            }
                            else if (div.ratio.length == 2){
                                const weight = stock.weight + Math.floor(stock.weight / div.ratio[0] * div.ratio[1]);
                                stock.weight = weight;
                            }
                            await user.save();
                            const temp = await Div.updateOne(div, {
                                isDiv: true
                            });
                        }
                    }
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports.updateDivAfterSell = async (username) => {
    try {
        const user = await User.findOne(username);
        const div = await Div.find(username);
        for (let stock of div){
            let flag = 0;
            for (let code of user.stockCode){
                if (stock.code == code.code){
                    flag = 1; 
                }
            }
            if (flag == 0){
                await Div.deleteMany({
                    username: username.username,
                    code: stock.code
                })
            }
        }
    } catch (error) {
        throw error;        
    }
}