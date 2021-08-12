const API_URL = "https://simulatestock.glitch.me/"
// const API_URL = "http://localhost:8080";


async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const url = API_URL + '/user/login';
    const payload = {
        username: username,
        password: password
    }
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const token = await response.json();
    if (token.message) {
        alert("User wrong or Password wrong");
        window.location.href = '/'
    }
    else {
        window.location.href = '/'
    }
}

async function register(){
    window.location.href = '/register';
}