var dataStockGobal = profit();
setInterval(refreshStock, 8000);

function refreshStock(){
    dataStockGobal = profit();
}

async function getNameOfUser() {
    const url = API_URL + '/v1/user/'
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let temp;
    if (data.roleUser){
        document.getElementById('admin').innerHTML = '';
        temp = document.createElement('span');
        temp.setAttribute('class', 'dropdown-item');
        temp.setAttribute('onclick', 'admin()');
        temp.innerHTML = 'Admin';
        document.getElementById('admin').appendChild(temp);
    }
    temp = document.createElement('span');
    temp.innerHTML = data.name;
    document.getElementById('navbarDropdown').appendChild(temp);
}

async function getUser(){
    const url = API_URL + '/v1/USA/';
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
        temp.innerHTML = (Math.round((cost[stock.code][3] * stock.weight * 0.999) * 100) /100).toLocaleString('en-US');
        row.appendChild(temp);

        temp = document.createElement('td');
        if ((cost[stock.code][3] * stock.weight * 0.999 - stock.capital) >= 0){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (Math.round((cost[stock.code][3] * stock.weight * 0.999 - stock.capital )* 100) /100).toLocaleString('en-US');
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

async function updateTableInfo(user, cost){
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
        tempCost = cost[stock.code][3] * stock.weight * 0.999;
        if (tempCost >= stock.capital){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (cost[stock.code][3] * stock.weight * 0.999).toLocaleString('en-US');
        row.appendChild(temp);

        temp = document.createElement('td');
        if ((cost[stock.code][3] * stock.weight * 0.999 - stock.capital) >= 0){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        temp.innerHTML = (cost[stock.code][3] * stock.weight * 0.999 - stock.capital).toLocaleString('en-US');
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
    const user = await getUserID();
    const priceStock = await dataStockGobal;
    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerText;
        weightSell = parseFloat(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell) && (weightSell > 0)){
            price = parseFloat(priceStock[stock][3]);
            table.childNodes[row].childNodes[3].innerHTML = (Math.round(price *  weightSell * 0.999 * 100) / 100).toLocaleString('en-US');
        }
        else {
            table.childNodes[row].childNodes[3].innerHTML = 0;
        }
    }
}

async function getRank(){
    const url = API_URL + "/v1/USA/all";
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
    let cost =  await dataStockGobal;
    data = data.map(ele => {
        const total = ele.stockCode.reduce((a,b) => {
            return a + cost[b.code][3] * b.weight * 0.999
        }, 0) + ele.money;
        const profit = ele.stockCode.reduce((a,b) => {
            return a + cost[b.code][3] * b.weight * 0.999 - b.capital
        }, 0)
        return {
            ...ele,
            profit,
            total
        }
    });
    data.sort(function(a,b){
        return -a.total + b.total;
    });
    table = document.createElement('table');
    table.setAttribute("class", "w-100 table table-dark table-striped")
    tbody = document.createElement("tbody");
    row = document.createElement('tr');

    temp = document.createElement('th');
    temp.innerHTML = 'Rank';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Name';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Profit';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Total';
    row.appendChild(temp);

    table.appendChild(row);

    for (let acc of data){
        count ++;
        // temp = document.createElement('p');
        // temp.innerHTML = count + '. ' + acc.name + ": " + acc.total.toLocaleString('en-US', {style : 'currency', currency : 'USD'});
        // document.getElementById('ranking').appendChild(temp);
        
        
        row = document.createElement('tr');

        temp = document.createElement('td');
        temp.innerHTML = count;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = acc.name;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = acc.profit.toLocaleString('en-US');
        row.appendChild(temp);
        
        temp = document.createElement('td');
        temp.innerHTML = acc.total.toLocaleString('en-US');
        row.appendChild(temp);

        tbody.appendChild(row);

        // if (count >= 5){
        //     break;
        // }
    }
    table.appendChild(tbody);
    document.getElementById("table-ranking").innerHTML = '';
    document.getElementById("table-ranking").appendChild(table);
}

async function logout(){
    window.location.href = '/logout';
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
        temp.setAttribute('id',stock + 'R')
        temp.innerHTML = data[stock][0];
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('magenta');
        temp.setAttribute('id',stock + 'C')
        temp.innerHTML = data[stock][1];
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('cyan');
        temp.setAttribute('id',stock + 'F')
        temp.innerHTML = data[stock][2];
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.setAttribute('id', 'price' + stock);
        if (parseFloat(data[stock][3]) == parseFloat(data[stock][1])){
            temp.classList.add('magenta');
        }
        else  if (parseFloat(data[stock][3]) == parseFloat(data[stock][2])){
            temp.classList.add('cyan');
        }
        else if (parseFloat(data[stock][3]) > parseFloat(data[stock][0])){
            temp.classList.add('green');
        }
        else  if (parseFloat(data[stock][3]) < parseFloat(data[stock][0])){
            temp.classList.add('red');
        }
        else {
            temp.classList.add('orange');
        }
        temp.innerHTML = data[stock][3];
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
        const user = await getUserID();
        const priceStock = await dataStockGobal;
        const currentPrice = priceStock[id][3];
        total.innerHTML = (Math.round(parseFloat(weight) * currentPrice * 100) / 100).toLocaleString('en-US');
    }
    else {
        total.innerHTML = '';
    }
}

async function getUserID() {
    const url = API_URL + '/v1/USA/'
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
    const url = API_URL + '/v1/USA/stock';
    const weight = document.getElementById(code).value;
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
    const url = API_URL + '/v1/USA/stock';
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
    user = await getUserID();
    url = API_URL + '/v1/USA/stock';
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
    const user = await getUserID();
    for (let stock in data){
        let temp = document.getElementById('price' + stock);
        if (temp.innerHTML != data[stock][3]){
            document.getElementById(stock + 'R').innerHTML = data[stock][0];
            document.getElementById(stock + 'C').innerHTML = data[stock][1];
            document.getElementById(stock + 'F').innerHTML = data[stock][2];

            if (parseFloat(data[stock][3]) == parseFloat(data[stock][1])){
                temp.className = 'magenta';
            }
            else  if (parseFloat(data[stock][3]) == parseFloat(data[stock][2])){
                temp.className = 'cyan';
            }
            else if (parseFloat(data[stock][3]) > parseFloat(data[stock][0])){
                temp.className = 'green';
            }
            else  if (parseFloat(data[stock][3]) < parseFloat(data[stock][0])){
                temp.className = 'red';
            }
            else {
                temp.className = 'orange';
            }
            temp.className += ' highlight';
            temp.innerHTML = data[stock][3];
            setTimeout(()=>{
                temp.classList.remove('highlight');
            }, 2000)
        }
    }
    updateTableInfo(user,data);
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
