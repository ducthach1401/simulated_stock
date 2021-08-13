async function home(){
    window.location.href = '/';
}

async function getUserAll(){
    const url = API_URL + '/user/getAll'
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

async function showUser(){
    const users = await getUserAll();
    let temp;
    for (let user of users){
        row = document.createElement('tr');
        temp = document.createElement('td');
        temp.innerHTML = user._id;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = user.name;
        row.appendChild(temp);

        temp = document.createElement('td');
        temp.innerHTML = Math.round(user.money).toLocaleString('vi-VN');
        row.appendChild(temp);

        temp = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute('id', user._id);
        temp.appendChild(input);
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.innerHTML = "Add";
        button.setAttribute('class', 'btn btn-success')
        button.setAttribute('onclick', 'addMoney(this.value)');
        button.setAttribute('value', user._id);
        temp.appendChild(button);
        row.appendChild(temp);

        temp = document.createElement('td');
        button = document.createElement('button');
        button.setAttribute('class', 'btn btn-secondary')
        button.setAttribute('onclick', 'subMoney(this.value)');
        button.setAttribute('value', user._id);
        button.innerHTML = "Sub";
        temp.appendChild(button);
        row.appendChild(temp);

        temp = document.createElement('td');
        if (!user.roleUser){
            button = document.createElement('button');
            button.setAttribute('class', 'btn btn-danger');
            button.setAttribute('onclick', 'deleteAcc(this.value)');
            button.setAttribute('value', user._id);
            button.innerHTML = "Delete";
            temp.appendChild(button);
        }
        row.appendChild(temp);

        document.getElementById('user').appendChild(row);
    }
}

async function addMoney(id){
    const url = API_URL + '/user/' + id + '/money';
    const money = parseInt(document.getElementById(id).value);
    const payload = {
        money: money
    }
    if (window.confirm('add Money?')){
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert('Success');
        window.location.reload();
    }  
}

async function subMoney(id){
    const url = API_URL + '/user/' + id + '/money';
    const money = parseInt(document.getElementById(id).value);
    const payload = {
        money: money
    }
    if (window.confirm('Sub money?')){
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert('Success');
        window.location.reload();
    }
}

async function deleteAcc(id){
    const url = API_URL + '/user/' + id;
    if (window.confirm('Delete???')){
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert('Success');
        window.location.reload();
    }
}