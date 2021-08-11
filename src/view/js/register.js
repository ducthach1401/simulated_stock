async function register() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    if (passwordConfirm != password){
        alert('Password does not match');
        window.location.href = '/register';
    }
    const url = 'http://localhost:8080/user/register'
    const payload = {
        name: name,
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
    if (!token.success) {
        alert(token.message);
        window.location.href = '/register';
    }
    else {
        alert("Register Success");
        window.location.href = '/'
    }
}

async function login(){
    window.location.href = '/'
}