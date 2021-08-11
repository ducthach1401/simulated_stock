async function getUser(){
    const url = 'https://simulatestock.glitch.me/user/';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json()
    let temp = document.createElement('p');
    temp.innerHTML = 'User Information';
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Name: ' + data.name;
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Money: ' + data.money;
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Capital: ' + data.capital;
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Earning: ' + data.earning;
    document.getElementById('user-information').appendChild(temp);

    temp = document.createElement('p');
    temp.innerHTML = 'Stock: ' + data.stockCode;
    document.getElementById('user-information').appendChild(temp);
}