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
    let data = await response.json()
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

    
    table = document.createElement('table');
    row = document.createElement('tr');

    header_code = document.createElement('th');
    header_code.innerHTML = 'Code';

    header_weight = document.createElement('th');
    header_weight.innerHTML = 'Weight';

    header_capital = document.createElement('th');
    header_capital.innerHTML = 'Capital';

    row.appendChild(header_code);
    row.appendChild(header_weight);
    row.appendChild(header_capital);
    table.appendChild(row);

    for (let stock of data.stockCode){
        row = document.createElement('tr');
        code = document.createElement('td');
        code.innerHTML = stock.code;

        weight = document.createElement('td');
        weight.innerHTML = stock.weight;

        capital = document.createElement('td');
        capital.innerHTML = stock.capital;

        row.appendChild(code);
        row.appendChild(weight);
        row.appendChild(capital);

        table.appendChild(row);
    }
    document.getElementById('user-information').appendChild(table);
}

async function getRank(){
    const url = API_URL + "/user/all";
    const response = await fetch(url, {
        method: 'GET',
        // credentials: 'include',
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
    }
}

async function logout(){
    window.location.href = '/logout';
}