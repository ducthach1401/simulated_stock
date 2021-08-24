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
        Swal.fire({
            title: "User wrong or Password wrong",
            icon: 'error'
        });
        setTimeout(() => {
            window.location.href = '/'
        }, 1000);
    }
    else {
        document.cookie = 'exp=' + Date.now();
        Swal.fire({
            title: "Login Success",
            icon: 'success'
        });
        setTimeout(() => {
            window.location.href = '/'
        }, 1000);
    }
}

async function register(){
    window.location.href = '/register';
}