var dataStockGobal = profit();
setInterval(refreshStock, 8000);

function refreshStock(){
    dataStockGobal = profit();
}

async function getUser(){
    const url = API_URL + '/v1/coin/';
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
    document.getElementById('information').innerHTML = '';
    document.getElementById('information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Money: ' + data.money.toLocaleString('en-US', {style : 'currency', currency : 'USD'});
    document.getElementById('information').appendChild(temp);
    
    temp = document.createElement('p');
    temp.innerHTML = 'Capital: ' + data.capital.toLocaleString('en-US', {style : 'currency', currency : 'USD'});
    document.getElementById('information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Earning: ' + data.earning.toLocaleString('en-US', {style : 'currency', currency : 'USD'});
    document.getElementById('information').appendChild(temp);

    if (data.roleUser){
        document.getElementById('admin').innerHTML = '';
        temp = document.createElement('span');
        temp.setAttribute('class', 'dropdown-item');
        temp.setAttribute('onclick', 'admin()');
        temp.innerHTML = 'Admin';
        document.getElementById('admin').appendChild(temp);
    }

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
    temp.innerHTML = 'Current Price';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Profit';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Percent';
    row.appendChild(temp);

    table.appendChild(row);
    tableSell.appendChild(rowSell);
    tableSell.setAttribute('id', 'tableSell');
    cost =  await dataStockGobal;
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
        capital.innerHTML = stock.weight.toLocaleString('en-US');
        rowSell.appendChild(capital);

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('en-US');
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
        temp.innerHTML = (Math.round((cost[stock.code][1] * stock.weight * 0.999) * 10000) /10000).toLocaleString('en-US');
        row.appendChild(temp);

        temp = document.createElement('td');
        if ((cost[stock.code][3] * stock.weight * 0.999 - stock.capital) >= 0){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (Math.round((cost[stock.code][1] * stock.weight * 0.999 - stock.capital )* 10000) /10000).toLocaleString('en-US');
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
        temp.setAttribute('onkeyup', 'totalBill()');
        temp.appendChild(input);
        rowSell.appendChild(temp);

        temp = document.createElement('td');
        rowSell.appendChild(temp);

        tableSell.appendChild(rowSell);
        table.appendChild(row);
    }
    document.getElementById('user-information').innerHTML = '';
    document.getElementById('user-information').appendChild(table);
    document.getElementById('user-information').appendChild(tableSell);

    button = document.createElement('button');
    button.setAttribute('class', "btn btn-outline-warning sellButton")
    button.innerHTML = 'Sell';
    button.setAttribute('onclick', 'sellStock()');
    document.getElementById('user-information').appendChild(button);

    button = document.createElement('button');
    button.setAttribute('class', "btn btn-outline-light totalButton");
    button.innerHTML = 'Total money';
    button.setAttribute('onclick', 'totalBill()');
    document.getElementById('user-information').appendChild(button);
}

async function updateTableInfo(cost){
    const user = await getUserID();
    let table = document.getElementById('tableinfo');
    table.innerHTML = '';
    row = document.createElement('tr');

    temp = document.createElement('th');
    temp.innerHTML = 'Code';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Capital';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Current Price';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Profit';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Percent';
    row.appendChild(temp);

    table.appendChild(row);
    for (let stock of user.stockCode){
        row = document.createElement('tr');

        code = document.createElement('td');
        code.innerHTML = stock.code;
        row.appendChild(code);

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('en-US');
        capital.setAttribute('class', 'orange');
        row.appendChild(capital);

        temp = document.createElement('td');
        tempCost = cost[stock.code][1] * stock.weight * 0.999;
        if (tempCost >= stock.capital){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (Math.round((cost[stock.code][1] * stock.weight * 0.999) * 100) / 100).toLocaleString('en-US');
        row.appendChild(temp);

        temp = document.createElement('td');
        if ((cost[stock.code][1] * stock.weight * 0.999 - stock.capital) >= 0){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (Math.round((cost[stock.code][1] * stock.weight * 0.999 - stock.capital) * 100) / 100).toLocaleString('en-US');
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
        table.appendChild(row);
    }
}

async function totalBill(){
    const priceStock = await dataStockGobal;
    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerText;
        weightSell = parseFloat(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell) && (weightSell > 0)){
            price = parseFloat(priceStock[stock][1]);
            table.childNodes[row].childNodes[3].innerHTML = (Math.round(price *  weightSell * 0.999 * 100) / 100).toLocaleString('en-US');
        }
        else {
            table.childNodes[row].childNodes[3].innerHTML = 0;
        }
    }
}


async function showStock(){
    const data =  await dataStockGobal;
    setInterval(updatePrice, 8000);
    for (let stock in data){
        row = document.createElement('tr')
        temp = document.createElement('td');
        temp.innerHTML = stock;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('orange');
        temp.innerHTML = data[stock][0];
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('ghostwhite');
        temp.setAttribute('id', 'price' + stock);
        temp.innerHTML =  (Math.round(data[stock][1] * 1000000) / 1000000).toLocaleString('en-US');
        row.appendChild(temp);

        temp = document.createElement('td');
        if (data[stock][2] >= 0){
            temp.classList.add('green');
        }
        else {
            temp.classList.add('red');
        }
        temp.setAttribute('id',stock + '1h')
        temp.innerHTML =  (Math.round(data[stock][2] * 1000) / 1000).toLocaleString('en-US') + ' %';
        row.appendChild(temp);

        temp = document.createElement('td');
        if (data[stock][3] >= 0){
            temp.classList.add('green');
        }
        else {
            temp.classList.add('red');
        }
        temp.setAttribute('id',stock + '24h')
        temp.innerHTML = (Math.round(data[stock][3] * 1000) / 1000).toLocaleString('en-US') + ' %';
        row.appendChild(temp);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute('onkeyup', 'totalCode(this.id)');
        input.setAttribute("id", stock);
        temp.appendChild(input);
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.setAttribute('id', 'total' + stock);
        temp.setAttribute('class', 'total');
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.value = stock;
        button.innerHTML = 'Buy';
        button.setAttribute('class', "btn btn-outline-info btn" + stock);
        button.setAttribute('onclick', 'buyStock(this.value)');
        temp.appendChild(button);
        row.appendChild(temp);
        document.getElementById('exchange').append(row);
    }
}

async function totalCode(id){
    let total = document.getElementById('total' + id);
    let weight = document.getElementById(id).value;
    if (!isNaN(weight) && (weight)){
        const priceStock = await dataStockGobal;
        const currentPrice = priceStock[id][1];
        total.innerHTML = (Math.round(parseFloat(weight) * currentPrice * 10000) / 10000).toLocaleString('en-US');
    }
    else {
        total.innerHTML = '';
    }
}

async function getUserID() {
    const url = API_URL + '/v1/coin/'
    let response = await fetch(url, {
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
    let button = document.getElementsByClassName('btn' + code);
    button.disabled = true;
    const url = API_URL + '/v1/coin/coin';
    const weight = document.getElementById(code).value;
    if (parseFloat(weight) < 0.001){
        Swal.fire({
            title: "Weight must be greater than 0.001",
            icon: 'error'
        });
        return;
    }
    if (!isNaN(weight) && (weight > 0)){
        payload = {
            code: code,
            weight: parseFloat(weight),
        }
        const confirmBuy = await Swal.fire({
            title: 'Do you buy ' + code + '?',
            icon: 'question',
            confirmButtonText: 'Buy',
            showCancelButton: true
        });
        if (confirmBuy.isConfirmed) {
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
                Swal.fire({
                    title: 'Buy Success',
                    icon: 'success'
                });
                document.getElementById(code).value = '';
                document.getElementById('total' + code).innerHTML = '';
                getUser();
            }
            else {
                Swal.fire({
                    title: "Don't enough money or Error",
                    icon: 'error'
                });
            }
        }
    }
    else {
        Swal.fire({
            title: "Please input integer number",
            icon: 'error'
        });
    }
    button.disabled = false;
}

async function sellStock(){
    let button = document.getElementsByClassName('sellButton');
    button.disabled = true;
    const url = API_URL + '/v1/coin/coin';
    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerText;
        weightSell = parseFloat(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell)){
            if (weightSell > 0){
                payload = {
                    code: stock,
                    weight: weightSell,
                }
                const confirmSell = await Swal.fire({
                    title: 'Do you sell ' + stock + '?',
                    icon: 'question',
                    confirmButtonText: 'Sell',
                    showCancelButton: true
                });
                if (confirmSell.isConfirmed) {
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
                        Swal.fire({
                            title: "Sell Success",
                            icon: 'success'
                        });
                        document.getElementById(stock + 'S').value = '';
                        getUser();
                    }
                    else {
                        Swal.fire({
                            title: "Don't enough weight or Error",
                            icon: 'error'
                        });
                    }
                }
            }
            else {
                Swal.fire({
                    title: "Please input integer number",
                    icon: 'error'
                });
            }
        }
        
        else if (document.getElementById(stock + 'S').value) {
            Swal.fire({
                title: "Please input integer number",
                icon: 'error'
            });
        }
    }
    button.disabled = false;
}

async function profit(){
    url = API_URL + '/v1/coin/coin';
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

async function updatePrice(){
    const data = await dataStockGobal;
    for (let stock in data){
        let temp = document.getElementById('price' + stock);
        if (temp.innerHTML != data[stock][1]){
            document.getElementById(stock + '1h').innerHTML = data[stock][2];
            document.getElementById(stock + '24h').innerHTML = data[stock][3];
            temp.className += 'ghostwhite highlight';
            temp.innerHTML = data[stock][1];
            setTimeout(()=>{
                temp.classList.remove('highlight');
            }, 2000)
        }
    }
    updateTableInfo(data);
}

function searchStock() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("exchange");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }       
    }
}
