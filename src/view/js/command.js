async function setCommand(){
    let radio = document.getElementsByName("options");
    let day = document.getElementsByName("day");
    let option;
    let exp;
    let command = document.getElementById('command').value;
    let code = document.getElementById('CCode').value;
    let weight = document.getElementById('CWeight').value;
    let price = document.getElementById('CPrice').value;
    
    if (code == ''){
        Swal.fire({
            title: "Please input Code",
            icon: "error"
        });
        return;
    }

    if (weight == ''){
        Swal.fire({
            title: "Please input Weight",
            icon: "error"
        });
        return;
    }
    else if (!Number.isInteger(parseFloat(weight))){
        Swal.fire({
            title: "Please input integer weight",
            icon: "error"
        });
        return;
    }
    else if (parseInt(weight) <= 0){
        Swal.fire({
            title: "Please input weight > 0",
            icon: "error"
        });
        return;
    }

    if (price == ''){
        Swal.fire({
            title: "Please input Price",
            icon: "error"
        });
        return;
    }
    else if (!Number.isInteger(parseFloat(price))){
        Swal.fire({
            title: "Please input integer Price",
            icon: "error"
        });
        return;
    }
    else if (parseInt(price) < 1000){
        Swal.fire({
            title: "Please input Price >= 1000",
            icon: "error"
        });
        return;
    }

    for (let value = 0; value < radio.length; value++){
        if (radio[value].checked){
            option = radio[value].value;
        }
    }

    for (let value = 0; value < day.length; value++){
        if (day[value].checked){
            exp = day[value].value;
            if (exp == 'true'){
                exp = true;
            }
            else {
                exp = false;
            }
        }
    }

    const payload = {
        command: command,
        code: code,
        weight: parseInt(weight),
        price: parseInt(price),
        isUnlimited: exp,
        option: option
    }
    const url = API_URL + '/v1/command/';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if (data.message == 'Success'){
        Swal.fire({
            title: "Set command successfully",
            icon: "success"
        });
        document.getElementById('CCode').value = '';
        document.getElementById('CWeight').value = '';
        document.getElementById('CPrice').value = '';
        document.getElementById('CTotal').value = '';
    }
    else {
        Swal.fire({
            title: data.message,
            icon: "error"
        })
    }
    getUser();
}

async function tableCommand(){
    const url = API_URL + '/v1/command/';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let table = document.getElementById("command-table");
    table.innerHTML = '';
    let row = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = 'Code';
    row.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Option';
    row.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Price';
    row.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Weight';
    row.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Total';
    row.appendChild(th);

    th = document.createElement('th');
    th.innerText = 'Delete';
    row.appendChild(th);
    
    table.appendChild(row);

    for (let command of data.data){
        row = document.createElement('tr');
        td = document.createElement('td');
        td.innerText = command.code;
        row.appendChild(td);

        td = document.createElement('td');
        if (command.option == 'sell'){
            td.innerText = 'Sell';
        }
        else {
            td.innerText = 'Purchase';
        }
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = command.price.toLocaleString('vi-vn');
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = command.weight.toLocaleString('vi-vn');
        row.appendChild(td);

        
        td = document.createElement('td');
        td.innerText = (command.weight * command.price).toLocaleString('vi-vn');
        row.appendChild(td);

        if (command.isUnlimited){
            row.setAttribute('class', 'magenta');
        }

        if (command.isSuccess){
            row.setAttribute('class', 'green');
        }
        
        td = document.createElement('td');
        let button = document.createElement('button');
        button.innerText = 'Delete';
        button.setAttribute('id', command._id);
        button.setAttribute('onclick', 'removeCommand(this.id)');
        button.setAttribute('class', 'btn btn-outline-danger');
        button.setAttribute('style', 'width: 90px');
        td.appendChild(button);
        row.appendChild(td);

        table.append(row);
    }
}

async function removeCommand(id){
    const url = API_URL + '/v1/command/' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    getUser();
}