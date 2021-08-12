// const API_URL = "https://simulatestock.glitch.me/";
const API_URL = "http://localhost:8080";

async function getUser(){
    const url = API_URL + '/user/'
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let temp = document.createElement('p');
    temp.innerHTML = 'Name: ' + data.name;
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Money: ' + data.money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Capital: ' + data.capital.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Earning: ' + data.earning.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById('user-information').appendChild(temp);

    tableSell = document.createElement('table');
    rowSell = document.createElement('tr');
    
    table = document.createElement('table');
    table.setAttribute('id','tableinfo')
    row = document.createElement('tr');

    temp = document.createElement('th');
    temp.innerHTML = 'Code';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Code'
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Weight';
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Weight Sell';
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Total Money';
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Capital';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Current Price'
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Profit Loss'
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Percent';
    row.appendChild(temp);

    table.appendChild(row);
    tableSell.appendChild(rowSell);
    tableSell.setAttribute('id', 'tableSell');
    cost = await profit(data);
    for (let stock of data.stockCode){
        row = document.createElement('tr');
        rowSell = document.createElement('tr');

        code = document.createElement('td');
        code.innerHTML = stock.code;
        row.appendChild(code);

        code = document.createElement('td');
        code.innerHTML = stock.code;
        rowSell.appendChild(code);

        capital = document.createElement('td');
        capital.innerHTML = stock.weight.toLocaleString('vi-VN');
        rowSell.appendChild(capital);

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('vi-VN');
        capital.setAttribute('class', 'orange');
        row.appendChild(capital);

        temp = document.createElement('td');
        tempCost = cost[stock.code][3] * stock.weight * 0.999;
        if (tempCost >= stock.capital){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (cost[stock.code][3] * stock.weight * 0.999).toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        if ((cost[stock.code][3] * stock.weight * 0.999 - stock.capital) >= 0){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (cost[stock.code][3] * stock.weight * 0.999 - stock.capital).toLocaleString('vi-VN');
        row.appendChild(temp);


        percent = document.createElement('td');
        if ((Math.round(tempCost / stock.capital * 10000)/100) >= 100){
            percent.setAttribute('class', 'green');
        }
        else {
            percent.setAttribute('class', 'red');
        }
        percent.innerHTML = Math.round(tempCost / stock.capital * 10000)/100 + ' %';
        row.appendChild(percent);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute("id", stock.code + "S");
        temp.appendChild(input);
        rowSell.appendChild(temp);

        temp = document.createElement('td');
        
        rowSell.appendChild(temp);

        tableSell.appendChild(rowSell);
        table.appendChild(row);
    }
    document.getElementById('user-information').appendChild(table);
    document.getElementById('user-information').appendChild(tableSell);

    button = document.createElement('button');
    button.setAttribute('class', "btn btn-success sellButton")
    button.innerHTML = 'Sell';
    button.setAttribute('onclick', 'sellStock()');
    document.getElementById('user-information').appendChild(button);

    button = document.createElement('button');
    button.setAttribute('class', "btn btn-success totalButton");
    button.innerHTML = 'Total money';
    button.setAttribute('onclick', 'totalBill()');
    document.getElementById('user-information').appendChild(button);
}

async function totalBill(){
    const user = await getUserID();
    const priceStock = await profit(user);

    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerHTML;
        weightSell = parseInt(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell) && (weightSell > 0)){
            price = parseInt(priceStock[stock][3]);
            table.childNodes[row].childNodes[3].innerHTML = (price *  weightSell).toLocaleString('vi-VN');
        }
        else {
            table.childNodes[row].childNodes[3].innerHTML = 0;
        }
    }
}

async function getRank(){
    const url = API_URL + "/user/all";
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json()
    let temp;
    let count = 0;
    data.sort(function(a,b){
        return -a.money + b.money;
    });
    for (let acc of data){
        count ++;
        temp = document.createElement('p');
        temp.innerHTML = count + '. ' + acc.name + ": " + acc.money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
        document.getElementById('ranking').appendChild(temp);
        if (count >= 5){
            break;
        }
    }
}

async function logout(){
    window.location.href = '/logout';
}

async function showStock(){
    const user = await getUserID();
    const url = API_URL + "/user/" + user._id + "/stocks";
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    for (let stock in data){
        row = document.createElement('tr')
        temp = document.createElement('td');
        temp.innerHTML = stock;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('orange');
        temp.innerHTML = data[stock][0].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('cyan');
        temp.innerHTML = data[stock][1].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('magenta');
        temp.innerHTML = data[stock][2].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.setAttribute('id', 'price' + stock);
        if (parseInt(data[stock][3]) > parseInt(data[stock][0])){
            temp.classList.add('green');
        }
        else  if (parseInt(data[stock][3]) < parseInt(data[stock][0])){
            temp.classList.add('red');
        }
        else {
            temp.classList.add('orange');
        }
        temp.innerHTML = data[stock][3].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute("id", stock);
        temp.appendChild(input);
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.value = stock;
        button.innerHTML = 'Buy';
        button.setAttribute('class', "btn btn-success")
        button.setAttribute('onclick', 'buyStock(this.value)');
        temp.appendChild(button);
        row.appendChild(temp);
        document.getElementById('exchange').append(row);
    }
}

async function getUserID() {
    const url = API_URL + '/user/'
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

async function buyStock(code){
    const user = await getUserID();
    const url = API_URL + '/user/' + user._id + '/stock';
    const weight = document.getElementById(code).value;
    if (!isNaN(weight) && (weight > 0)){
        payload = {
            code: code,
            weight: parseInt(weight)
        }
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        if (data.Money){
            alert('Buy Success');
            window.location.reload();
        }
        else {
            alert("Don't enough money or Error");
            window.location.reload();
        }
    }
    else {
        alert('Please input integer number');
    }
}

async function sellStock(){
    const user = await getUserID();
    const url = API_URL + '/user/' + user._id + '/stock';
    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerHTML;
        weightSell = parseInt(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell)){
            if (weightSell > 0){
                payload = {
                    code: stock,
                    weight: weightSell
                }
                const response = await fetch(url, {
                    method: 'DELETE',
                    body: JSON.stringify(payload),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                let data = await response.json();
                if (data.money){
                    alert('Sell Success');
                    window.location.reload();
                }
                else {
                    alert("Don't enough weight or Error");
                    window.location.reload();
                }
            }
            else {
                alert('Please input integer number');
            }
        }
    }
}

async function profit(user){
    url = API_URL + '/user/' + user._id + '/stocks';
    response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let dataStock = await response.json();
    return dataStock;
}