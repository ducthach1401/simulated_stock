const API_URL = "https://simulatestock.glitch.me";
// const API_URL = "https://simulatestock.herokuapp.com";
// const API_URL = "http://localhost:8080";

async function logout(){
    window.location.href = '/logout';
}

async function admin(){
    window.location.href = '/admin';
}

async function changeName(){
    window.location.href = '/changeName';
}

async function changePassword(){
    window.location.href = '/changePassword';
}

async function home(){
    window.location.href = '/'
}

async function refreshToken(){
    const url = API_URL + '/v1/user/refresh';
    const time_login = document.cookie.split('=')[1];
    const hour = Math.round((Date.now() - time_login) / (60 * 1000 * 60));
    if (hour >= 4){
        const result = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        document.cookie = 'exp=' + Date.now();
    }
}
setInterval(refreshToken, 600000)
refreshToken();
