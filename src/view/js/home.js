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

    
    table = document.createElement('table');
    row = document.createElement('tr');

    header_code = document.createElement('th');
    header_code.innerHTML = 'Code';

    header_weight = document.createElement('th');
    header_weight.innerHTML = 'Weight';

    header_capital = document.createElement('th');
    header_capital.innerHTML = 'Capital';

    header_weightS = document.createElement('th');
    header_weightS.innerHTML = 'Weight'

    header_Sell = document.createElement('th');
    header_Sell.innerHTML = 'Sell'

    row.appendChild(header_code);
    row.appendChild(header_weight);
    row.appendChild(header_capital);
    row.appendChild(header_weightS);
    row.appendChild(header_Sell);
    table.appendChild(row);

    for (let stock of data.stockCode){
        row = document.createElement('tr');
        code = document.createElement('td');
        code.innerHTML = stock.code;

        weight = document.createElement('td');
        weight.innerHTML = stock.weight;

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('vi-VN');


        row.appendChild(code);
        row.appendChild(weight);
        row.appendChild(capital);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute("id", stock.code + "S");
        temp.appendChild(input);
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.setAttribute('class', "btn btn-success")
        button.value = stock.code + "S";
        button.innerHTML = 'Sell';
        button.setAttribute('onclick', 'sellStock(this.value)');
        temp.appendChild(button);
        row.appendChild(temp);

        table.appendChild(row);
    }
    document.getElementById('user-information').appendChild(table);
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
        temp.classList.add('green');
        temp.innerHTML = data[stock][1].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('red');
        temp.innerHTML = data[stock][2].toLocaleString('vi-VN');
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