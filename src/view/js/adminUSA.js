// setInterval(updateMoney, 2000);

async function getUserUSD(){
    const url = API_URL + '/v1/admin/all'
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

async function updateUSD(){
    const users = await getUserUSD();
    console.log(users);
    for (let user of users){
        document.getElementById('money' + user._id).innerHTML = Math.round(user.money).toLocaleString('vi-VN');
    }
}
async function showUserUSD(){
    document.getElementById('sp500User').classList.add('active');
    document.getElementById('hoseUser').classList.remove('active');
    const users = await getUserUSD();
    let temp;
    let count = 0;
    document.getElementById('user').innerHTML = '';

    row = document.createElement('tr');
    temp = document.createElement('td');
    temp.innerHTML = 'ID';
    row.appendChild(temp);

    temp = document.createElement('td');
    temp.innerHTML = 'Name';
    row.appendChild(temp);

    temp = document.createElement('td');
    temp.innerHTML = 'Money';
    row.appendChild(temp);

    temp = document.createElement('td');
    temp.innerHTML = 'Add/Sub Money	';
    row.appendChild(temp);

    temp = document.createElement('td');
    temp.innerHTML = 'Add';
    row.appendChild(temp);

    temp = document.createElement('td');
    temp.innerHTML = 'Sub';
    row.appendChild(temp);

    temp = document.createElement('td');
    temp.innerHTML = 'Delete';
    row.appendChild(temp);

    document.getElementById('user').appendChild(row);

    for (let user of users){
        count ++;
        row = document.createElement('tr');
        temp = document.createElement('td');
        temp.innerHTML = count;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = user.name;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = Math.round(user.money).toLocaleString('vi-VN');
        temp.setAttribute('id', 'money' + user._id);
        row.appendChild(temp);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute('id', user._id);
        temp.appendChild(input);
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.innerHTML = "Add";
        button.setAttribute('class', 'btn btn-outline-info')
        button.setAttribute('onclick', 'addUSD(this.value)');
        button.setAttribute('value', user._id);
        temp.appendChild(button);
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.setAttribute('class', 'btn btn-outline-light')
        button.setAttribute('onclick', 'subUSD(this.value)');
        button.setAttribute('value', user._id);
        button.innerHTML = "Sub";
        temp.appendChild(button);
        row.appendChild(temp);

        temp = document.createElement('td');
        if (!user.roleUser){
            button = document.createElement('button');
            button.setAttribute('class', 'btn btn-outline-danger');
            button.setAttribute('value', user._id);
            button.setAttribute('onclick', 'notify()');
            button.innerHTML = "Delete";
            temp.appendChild(button);
        }
        row.appendChild(temp);
        document.getElementById('user').appendChild(row);
    }
}

async function addUSD(id){
    const url = API_URL + '/v1/admin/' + id + '/USD';
    const money = parseInt(document.getElementById(id).value);
    const payload = {
        money: money
    }
    const confirmAdd = await Swal.fire({
        title: 'Do you add money ' + money + '?',
        icon: 'question',
        confirmButtonText: 'Add',
        showCancelButton: true
    });
    if (confirmAdd.isConfirmed) {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        Swal.fire({
            title: "Success",
            icon: 'success'
        });
        document.getElementById(id).value = '';
        updateUSD();
    }  
}

async function subUSD(id){
    const url = API_URL + '/v1/admin/' + id + '/USD';
    const money = parseInt(document.getElementById(id).value);
    const payload = {
        money: money
    }
    const confirmSub = await Swal.fire({
        title: 'Do you sub money ' + money + '?',
        icon: 'question',
        confirmButtonText: 'Add',
        showCancelButton: true
    });
    if (confirmSub.isConfirmed) {
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        Swal.fire({
            title: "Success",
            icon: 'success'
        });        
        document.getElementById(id).value = '';
        updateUSD();
    }
}

async function notify(){
    Swal.fire({
        title: "Just to beautiful :)))))",
        icon: 'error'
    });  
}