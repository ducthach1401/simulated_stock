async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const url = 'http://localhost:8080/user/login'
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
    }
    else {
        alert("Login Success");
        document.cookie = "accessToken = '${token.accessToken}'; refreshToken = ${token.refreshToken};"
    }
}