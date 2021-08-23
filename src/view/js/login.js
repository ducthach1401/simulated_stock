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
        window.location.href = '/';
    }
    else {
        document.cookie = 'exp=' + Date.now();
        window.location.href = '/';
    }
}

async function register(){
    window.location.href = '/register';
}