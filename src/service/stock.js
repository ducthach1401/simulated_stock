const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];

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
        const browser = await puppeteer.launch({
            headless: true,
            args: minimal_args
        });
        const options = {
            waitUntil: 'networkidle2',
            timeout: 30000,
        };
        const page = await browser.newPage();
        const blockedDomains = [
            'https://pagead2.googlesyndication.com',
            'https://creativecdn.com',
            'https://www.googletagmanager.com',
            'https://cdn.krxd.net',
            'https://adservice.google.com',
            'https://cdn.concert.io',
            'https://z.moatads.com',
            'https://cdn.permutive.com',
            'https://googlesyndication.com'
        ];
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const url = request.url();
            if (blockedDomains.some((d) => url.startsWith(d))) {
            request.abort();
            } else {
            request.continue();
            }
        });

        await page.goto('https://vn.investing.com/equities/americas', options);
        await page.select('select[class="selectBox"]', 'S&P 500');
        await page.waitForSelector('#cross_rate_markets_stocks_1');
        const data = await page.evaluate(() => {
            let result = {};
            let data = document.querySelector('#cross_rate_markets_stocks_1');
            data = data.querySelectorAll('tr');
            for (let i = 1; i < data.length; i++){
                let name = data[i].querySelector('a').innerHTML;
                let id = data[i].getAttribute('id').replace('pair_', '');
                let last = data[i].querySelector('.pid-'+ id + '-last').innerHTML.replace(',','');
                let high = data[i].querySelector('.pid-'+ id + '-high').innerHTML.replace(',','');
                let low = data[i].querySelector('.pid-'+ id + '-low').innerHTML.replace(',','');
                let tc = Math.round((parseFloat(high) + parseFloat(low)) * 100 / 2 ) / 100;
                result[name] = [tc, parseFloat(high), parseFloat(low), parseFloat(last)];
            }
            return result;
        });
        await browser.close();
        return data;
    } catch (error) {
        throw error;
    }
}

