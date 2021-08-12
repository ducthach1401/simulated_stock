async function register() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    if (name.length > 20){
        alert("Name must be less than 20 characters");
    }
    else if (username.length > 20) {
        alert("Username must be less than 20 characters");
    }
    else if (passwordConfirm != password){
        alert('Password does not match');
    }
    else {
        const url = API_URL + '/user/register';
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
        }
        else {
            alert("Register Success");
            window.location.href = '/'
        }
    }
}

async function login(){
    window.location.href = '/'
}