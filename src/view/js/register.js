async function register() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    if (name.length > 20){
        Swal.fire({
            title: "Name must be less than 20 characters",
            icon: 'error'
        });
    }
    else if (username.length > 20) {
        Swal.fire({
            title: "Username must be less than 20 characters",
            icon: 'error'
        });
    }
    else if (passwordConfirm != password){
        Swal.fire({
            title: "Password does not match",
            icon: 'error'
        });
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
            Swal.fire({
                title: token.message,
                icon: 'error'
            });
        }
        else {
            Swal.fire({
                title: "Register Success",
                icon: 'success'
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);
        }
    }
}

async function login(){
    window.location.href = '/'
}