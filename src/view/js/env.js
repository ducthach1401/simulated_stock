const API_URL = "https://stock.bighand.asia:8080";
// const API_URL = "http://192.168.123.31";

async function logout() {
  window.location.href = "/logout";
}

async function admin() {
  window.location.href = "/admin";
}

async function changeName() {
  window.location.href = "/changeName";
}

async function changePassword() {
  window.location.href = "/changePassword";
}

async function home() {
  window.location.href = "/";
}

async function refreshToken() {
  const url = API_URL + "/v1/user/refresh";
  const time_login = document.cookie.split("=")[1];
  const hour = Math.round((Date.now() - time_login) / (60 * 1000 * 60));
  if (hour >= 4) {
    const result = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.cookie = "exp=" + Date.now();
  }
}

async function getNameOfUser() {
  const url = API_URL + "/v1/user/";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  let temp;
  if (data.roleUser) {
    document.getElementById("admin").innerHTML = "";
    temp = document.createElement("span");
    temp.setAttribute("class", "dropdown-item");
    temp.setAttribute("onclick", "admin()");
    temp.innerHTML = "Admin";
    document.getElementById("admin").appendChild(temp);
  }
  temp = document.createElement("span");
  temp.innerHTML = data.name;
  document.getElementById("navbarDropdown").appendChild(temp);
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

setInterval(refreshToken, 600000);
refreshToken();
