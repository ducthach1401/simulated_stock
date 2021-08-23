// const API_URL = "https://simulatestock.glitch.me";
const API_URL = "http://localhost:8080";

async function refreshToken(){
    const url = API_URL + '/user/v1/refresh';
    const result = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

refreshToken();