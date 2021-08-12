const API_URL = "https://simulatestock.glitch.me/";
// const API_URL = "http://localhost:8080";

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
    temp.innerHTML = 'Sell';
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
        capital.innerHTML = stock.weight;
        rowSell.appendChild(capital);

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('vi-VN');
        row.appendChild(capital);

        temp = document.createElement('td');
        tempCost = cost[stock.code][3] * stock.weight * 0.999;
        temp.innerHTML = (cost[stock.code][3] * stock.weight * 0.999).toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = (cost[stock.code][3] * stock.weight * 0.999 - stock.capital).toLocaleString('vi-VN');
        row.appendChild(temp);


        percent = document.createElement('td');
        percent.innerHTML = Math.round(tempCost / stock.capital * 10000)/100 + ' %';
        row.appendChild(percent);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute("id", stock.code + "S");
        temp.appendChild(input);
        rowSell.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.setAttribute('class', "btn btn-success")
        button.value = stock.code + "S";
        button.innerHTML = 'Sell';
        button.setAttribute('onclick', 'sellStock(this.value)');
        temp.appendChild(button);
        rowSell.appendChild(temp);

        tableSell.appendChild(rowSell);
        table.appendChild(row);
    }
    document.getElementById('user-information').appendChild(table);
    document.getElementById('user-information').appendChild(tableSell);
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
    if (!isNaN(weight)){
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

async function sellStock(code){
    const user = await getUserID();
    const url = API_URL + '/user/' + user._id + '/stock';
    const weight = document.getElementById(code).value;
    code = code.slice(0, code.length - 1);
    if (!isNaN(weight)){
        payload = {
            code: code,
            weight: parseInt(weight)
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