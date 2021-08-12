async function changePassword() {
    const user = await getUserID();
    const url = API_URL + '/user/' + user._id + '/password';
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
        alert("Success and Login again")
        window.location.href = '/logout';
    }
    else {
        alert("Password don't match");
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