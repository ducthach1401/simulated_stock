var dataStockGobal = profit();
getVNIndex();
setInterval(getVNIndex, 8000);
setInterval(refreshStock, 8000);

function refreshStock(){
    dataStockGobal = profit();
}

async function getUser(){
    const url = API_URL + '/v1/user/';
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
    temp.innerHTML = 'Money: ' + data.money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById('information').appendChild(temp);
    
    temp = document.createElement('p');
    temp.innerHTML = 'Capital: ' + data.capital.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById('information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Earning: ' + data.earning.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    document.getElementById('information').appendChild(temp);

    if (data.roleUser){
        document.getElementById('admin').innerHTML = '';
        temp = document.createElement('span');
        temp.setAttribute('class', 'dropdown-item');
        temp.setAttribute('onclick', 'admin()');
        temp.innerHTML = 'Admin';
        document.getElementById('admin').appendChild(temp);
    }

    showTableInfo(data);
    showSellTable(data);
    tableCommand();
    showDiv();
}

async function showTableInfo(data){
    table = document.getElementById('tableinfo');
    table.innerHTML = '';
    row = document.createElement('tr');

    temp = document.createElement('th');
    temp.innerHTML = 'Code';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Price';
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

    cost =  await dataStockGobal;
    for (let stock of data.stockCode){
        tempCost = cost[stock.code][3] * stock.weight * 0.999;
        row = document.createElement('tr');
        code = document.createElement('td');
        code.innerHTML = stock.code;
        row.appendChild(code);

        temp = document.createElement('td');
        temp.innerHTML = cost[stock.code][3].toLocaleString('vi-vn');
        if (tempCost >= stock.capital){
            temp.setAttribute('class', 'green');
        }
        else {
            temp.setAttribute('class', 'red');
        }
        row.appendChild(temp);

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('vi-VN');
        capital.setAttribute('class', 'orange');
        row.appendChild(capital);

        temp = document.createElement('td');
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
        table.appendChild(row);
    }
}
async function showSellTable(data){
    tableSell = document.getElementById('tableSell');
    tableSell.innerHTML = '';
    rowSell = document.createElement('tr');

    temp = document.createElement('th');
    temp.innerHTML = 'Code'
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Weight';
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Date Buy';
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Weight Sell';
    rowSell.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Total Money';
    rowSell.appendChild(temp);
    tableSell.appendChild(rowSell);

    cost =  await dataStockGobal;
    for (let stock of data.stockCode){
        rowSell = document.createElement('tr');
        code = document.createElement('td');
        code.innerHTML = stock.code;
        rowSell.appendChild(code);

        capital = document.createElement('td');
        capital.innerHTML = stock.weight.toLocaleString('vi-VN');
        rowSell.appendChild(capital);

        capital = document.createElement('td');
        let dateBuy = new Date(stock.dateBuy);
        const month = String(dateBuy.getMonth() + 1).padStart(2, '0');
        const day = String(dateBuy.getDate()).padStart(2, '0');
        const year = dateBuy.getFullYear();
        capital.innerHTML = day + '/' + month + '/' + year;
        rowSell.appendChild(capital);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute("id", stock.code + "S");
        temp.setAttribute('onkeyup', 'totalBill()');
        temp.appendChild(input);
        rowSell.appendChild(temp);

        temp = document.createElement('td');
        rowSell.appendChild(temp);

        tableSell.appendChild(rowSell);
    }
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
    temp.innerHTML = 'Price';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Capital';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Total Price';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Profit';
    row.appendChild(temp);

    temp = document.createElement('th');
    temp.innerHTML = 'Percent';
    row.appendChild(temp);

    table.appendChild(row);
    for (let stock of user.stockCode){
        tempCost = cost[stock.code][3] * stock.weight * 0.999;
        row = document.createElement('tr');

        code = document.createElement('td');
        code.innerHTML = stock.code;
        row.appendChild(code);

        code = document.createElement('td');
        code.innerHTML = cost[stock.code][3].toLocaleString('vi-vn');
        if (tempCost >= stock.capital){
            code.setAttribute('class', 'green');
        }
        else {
            code.setAttribute('class', 'red');
        }
        row.appendChild(code);

        capital = document.createElement('td');
        capital.innerHTML = stock.capital.toLocaleString('vi-VN');
        capital.setAttribute('class', 'orange');
        row.appendChild(capital);

        temp = document.createElement('td');
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
        table.appendChild(row);
    }
}

async function totalBill(){
    const priceStock = await dataStockGobal;
    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerHTML;
        weightSell = parseFloat(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell) && (weightSell > 0)){
            price = parseFloat(priceStock[stock][3]);
            table.childNodes[row].childNodes[4].innerHTML = (price *  weightSell * 0.999).toLocaleString('vi-VN');
        }
        else {
            table.childNodes[row].childNodes[4].innerHTML = 0;
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
        temp.innerHTML = data[stock][0].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('magenta');
        temp.innerHTML = data[stock][1].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.classList.add('cyan');
        temp.innerHTML = data[stock][2].toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.setAttribute('id', 'price' + stock);
        if (parseInt(data[stock][3]) == parseInt(data[stock][1])){
            temp.classList.add('magenta');
        }
        else  if (parseInt(data[stock][3]) == parseInt(data[stock][2])){
            temp.classList.add('cyan');
        }
        else if (parseInt(data[stock][3]) > parseInt(data[stock][0])){
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
        input.setAttribute('onkeyup', 'totalCode(this.id)');
        input.setAttribute("id", stock);
        temp.appendChild(input);
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.setAttribute('id', 'total' + stock);
        temp.setAttribute('class', 'total');
        row.appendChild(temp);
        document.getElementById('exchange').append(row);
    }
}

async function totalCode(id){
    let total = document.getElementById('total' + id);
    let weight = document.getElementById(id).value;
    if (!isNaN(weight) && (weight)){
        const priceStock = await dataStockGobal;
        const currentPrice = priceStock[id][3];
        total.innerHTML = Math.round(parseFloat(weight) * currentPrice).toLocaleString('vi-VN');
    }
    else {
        total.innerHTML = '';
    }
}

async function getUserID() {
    const url = API_URL + '/v1/user/'
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
    const url = API_URL + '/v1/user/stock';
    const weight = document.getElementById(code).value;
    if (!isNaN(weight) && (weight > 0)){
        payload = {
            code: code,
            weight: parseFloat(weight),
        }
        const confirmBuy = await Swal.fire({
            title: 'Are you sure to purchase ' + code + '?',
            icon: 'question',
            confirmButtonText: 'Purchase',
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
                    title: 'Purchase Successfully',
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
    const url = API_URL + '/v1/user/stock';
    const table = document.getElementById('tableSell');
    let stock;
    for (let row = 1; row < table.childElementCount; row++){
        stock = table.childNodes[row].childNodes[0].innerHTML;
        weightSell = parseFloat(document.getElementById(stock + 'S').value);
        if (!isNaN(weightSell)){
            if (weightSell > 0){
                payload = {
                    code: stock,
                    weight: weightSell,
                }
                const confirmSell = await Swal.fire({
                    title: 'Are you sure to sell ' + stock + '?',
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
    url = API_URL + '/v1/user/stocks';
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
        if (temp.innerHTML != data[stock][3].toLocaleString('vi-VN')){
            if (parseInt(data[stock][3]) == parseInt(data[stock][1])){
                temp.className = 'magenta';
            }
            else  if (parseInt(data[stock][3]) == parseInt(data[stock][2])){
                temp.className = 'cyan';
            }
            else if (parseInt(data[stock][3]) > parseInt(data[stock][0])){
                temp.className = 'green';
            }
            else  if (parseInt(data[stock][3]) < parseInt(data[stock][0])){
                temp.className = 'red';
            }
            else {
                temp.className = 'orange';
            }
            temp.className += ' highlight';
            temp.innerHTML = data[stock][3].toLocaleString('vi-VN');
            setTimeout(()=>{
                temp.classList.remove('highlight');
            }, 2000)
        }
    }
    getUser();
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

async function getVNIndex() {
    const url = API_URL + '/v1/user/VNIndex';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let VNIndex = document.getElementById('VN-Index');
    VNIndex.className = 'col-5';
    if (data['change'] >= 0){
        VNIndex.innerHTML = data['name'] + ': ' + data['price'] + '  &uarr; ' + data['change'] + ' (' + data['prechange'] + '%)';
        VNIndex.classList.add('green');
    }
    else {
        VNIndex.innerHTML = data['name'] + ': ' + data['price'] + '  &darr; ' + data['change'] + ' (' + data['prechange'] + '%)';
        VNIndex.classList.add('red');
    }
}

async function showDiv(){
    const url = API_URL + '/v1/user/div';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let table = document.getElementById('tableDiv');
    table.innerHTML = '';
    let th = document.createElement('th');
    th.innerText = 'Code';
    table.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Dividend Date';
    table.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Ratio';
    table.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Paid';
    table.appendChild(th);

    for (let code of data) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = code.code;
        tr.appendChild(td);
        table.appendChild(tr);

        td = document.createElement('td');
        td.innerText = code.date;
        tr.appendChild(td);
        table.appendChild(tr);

        td = document.createElement('td');
        if (code.ratio.length == 1){
            td.innerText = code.ratio.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'}) + ' / Stock';
        }
        else {
            td.innerText = code.ratio[0] + ' / ' + code.ratio[1];
        }
        tr.appendChild(td);
        table.appendChild(tr);

        td = document.createElement('td');
        if (code.isDiv){
            td.innerText = 'x';
            tr.setAttribute('class', 'green');
        }
        else {
            tr.setAttribute('class', 'red');
        }
        tr.appendChild(td);
        table.appendChild(tr);

    }
}

var toggle = 0;

function toggleFooter() {
    if (toggle == 1){
        document.getElementById('toggle').className = "btn btn-outline-light";
        document.getElementById('toggle').style.bottom = "0px";
        document.getElementById('footer').style.display = "none";
        toggle = 0;
    }
    else {
        document.getElementById('toggle').className += " active";
        document.getElementById('toggle').style.bottom = "120px";
        document.getElementById('footer').style.display = "block";
        toggle = 1;
    }
}

async function totalPrice() {
    let price = document.getElementById('CPrice').value;
    let weight = document.getElementById('CWeight').value;
    if ((weight != '') && (price != '')){
        document.getElementById('CTotal').value = (parseInt(price) * parseInt(weight)).toLocaleString('vi-vn');
    }
    else {
        document.getElementById('CTotal').value = 0;
    }
}

async function timeStock () {
    const options1 = { timeZone: 'Asia/Ho_Chi_Minh', timeZoneName: 'short',  hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'};
    const options2 = { timeZone: 'Asia/Ho_Chi_Minh', timeZoneName: 'short',  month: '2-digit', day: '2-digit', year: 'numeric'};
    const today = new Date();
    let time = today.toLocaleTimeString("vi-VN", options1).split(' ')[0];
    let date = today.toLocaleDateString("vi-VN", options2).split(' ')[1];
    let dateEng = today.toLocaleDateString("en-US", options2).split(',')[0];
    const weekend = new Date(dateEng).getDay();
    
    let exchange = document.getElementById('infoExchange');
    let info = '';
    if ((parseInt(time.split(':')[0]) >= 9) && (parseInt(time.split(':')[0]) <= 14) && (weekend != 0) && (weekend != 6)) {
        info = 'Open Exchange';
        exchange.classList = 'green';
    }
    else {
        info = 'Close Exchange';
        exchange.classList = 'red';
    }
    document.getElementById('timeVN').innerHTML = time;
    document.getElementById('dateVN').innerText = date;
    exchange.innerHTML = '<b>' + info + '</b>';
    // timeStock();
}

setInterval(timeStock, 1000);
