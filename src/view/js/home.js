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
    const myJson = await response.json();
    document.getElementById("test").innerHTML = myJson.message;
}