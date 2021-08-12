const API_URL = "https://simulatestock.glitch.me/";
// const API_URL = "http://localhost:8080";

async function changeName() {
    const user = await getUserID();
    const url = API_URL + '/user/' + user._id;
    const name = document.getElementById('name').value;
    if (name.length > 20){
        alert('Name must be less than 20 characters')
    }
    else {
        const payload = {
            name: document.getElementById('name').value
        }
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        window.location.href = '/';
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


async function cancel() {
    window.location.href = '/';
}