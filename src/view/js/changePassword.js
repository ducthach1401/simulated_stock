async function changePassword() {
    const user = await getUserID();
    const url = API_URL + '/v1/user/password';
    const password = document.getElementById('password').value;
    const password_confirm = document.getElementById('password-confirm').value;
    if (password_confirm == password){
        const payload = {
            password: password
        }
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        Swal.fire({
            title: "Success and Login again",
            icon: 'success'
        });
        setTimeout(() => {
            window.location.href = '/logout';
        }, 1000);
    }
    else {
        Swal.fire({
            title: "Password don't match",
            icon: 'error'
        });
    }
}

async function getUserID() {
    const url = API_URL + '/v1/user/'
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