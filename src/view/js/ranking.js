async function profit() {
  url = API_URL + "/v1/user/stocks";
  response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let dataStock = await response.json();
  return dataStock;
}

async function profitUSA() {
  url = API_URL + "/v1/USA/stock";
  response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let dataStock = await response.json();
  return dataStock;
}

async function getRank() {
  // document.getElementById('hose').classList.add('active');
  // document.getElementById('sp500').classList.remove('active');
  const url = API_URL + "/v1/user/all";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  let temp;
  let count = 0;
  let cost = await profit();
  data = data.map((ele) => {
    const total =
      ele.stockCode.reduce((a, b) => {
        if (cost[b.code] == undefined) {
          return 0;
        }
        return a + cost[b.code][3] * b.weight * 0.999;
      }, 0) + ele.money;
    const profit = ele.stockCode.reduce((a, b) => {
      if (cost[b.code] == undefined) {
        return 0;
      }
      return a + cost[b.code][3] * b.weight * 0.999 - b.capital;
    }, 0);
    return {
      ...ele,
      profit,
      total,
    };
  });
  data.sort(function (a, b) {
    return -a.total + b.total;
  });
  table = document.createElement("table");
  table.setAttribute("class", "w-100 table table-dark table-striped");
  tbody = document.createElement("tbody");
  row = document.createElement("tr");

  temp = document.createElement("th");
  temp.innerHTML = "Rank";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Name";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Profit";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Total";
  row.appendChild(temp);

  table.appendChild(row);

  for (let acc of data) {
    count++;
    // temp = document.createElement('p');
    // temp.innerHTML = count + '. ' + acc.name + ": " + acc.total.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    // document.getElementById('ranking').appendChild(temp);

    row = document.createElement("tr");

    temp = document.createElement("td");
    temp.innerHTML = count;
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.name;
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.profit.toLocaleString("vi-VN");
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.total.toLocaleString("vi-VN");
    row.appendChild(temp);

    tbody.appendChild(row);

    // if (count >= 5){
    //     break;
    // }
  }
  table.appendChild(tbody);
  document.getElementById("table-ranking-hose").innerHTML = "";
  document.getElementById("table-ranking-hose").appendChild(table);
}

async function getRankUSA() {
  // document.getElementById('sp500').classList.add('active');
  // document.getElementById('hose').classList.remove('active');
  const url = API_URL + "/v1/USA/all";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  let temp;
  let count = 0;
  let cost = await profitUSA();
  data = data.map((ele) => {
    const total =
      ele.stockCode.reduce((a, b) => {
        return a + cost[b.code][3] * b.weight * 0.999;
      }, 0) + ele.money;
    const profit = ele.stockCode.reduce((a, b) => {
      return a + cost[b.code][3] * b.weight * 0.999 - b.capital;
    }, 0);
    return {
      ...ele,
      profit,
      total,
    };
  });
  data.sort(function (a, b) {
    return -a.total + b.total;
  });
  table = document.createElement("table");
  table.setAttribute("class", "w-100 table table-dark table-striped");
  tbody = document.createElement("tbody");
  row = document.createElement("tr");

  temp = document.createElement("th");
  temp.innerHTML = "Rank";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Name";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Profit";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Total";
  row.appendChild(temp);

  table.appendChild(row);

  for (let acc of data) {
    count++;
    // temp = document.createElement('p');
    // temp.innerHTML = count + '. ' + acc.name + ": " + acc.total.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    // document.getElementById('ranking').appendChild(temp);

    row = document.createElement("tr");

    temp = document.createElement("td");
    temp.innerHTML = count;
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.name;
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.profit.toLocaleString("vi-VN");
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.total.toLocaleString("vi-VN");
    row.appendChild(temp);

    tbody.appendChild(row);

    // if (count >= 5){
    //     break;
    // }
  }
  table.appendChild(tbody);
  document.getElementById("table-ranking-sp500").innerHTML = "";
  document.getElementById("table-ranking-sp500").appendChild(table);
}

async function getRankCoin() {
  const url = API_URL + "/v1/coin/all";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  let temp;
  let count = 0;
  let cost = await dataStockGobal;
  data = data.map((ele) => {
    const total =
      ele.stockCode.reduce((a, b) => {
        return a + cost[b.code][3] * b.weight * 0.999;
      }, 0) + ele.money;
    const profit = ele.stockCode.reduce((a, b) => {
      return a + cost[b.code][3] * b.weight * 0.999 - b.capital;
    }, 0);
    return {
      ...ele,
      profit,
      total,
    };
  });
  data.sort(function (a, b) {
    return -a.total + b.total;
  });
  table = document.createElement("table");
  table.setAttribute("class", "w-100 table table-dark table-striped");
  tbody = document.createElement("tbody");
  row = document.createElement("tr");

  temp = document.createElement("th");
  temp.innerHTML = "Rank";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Name";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Profit";
  row.appendChild(temp);

  temp = document.createElement("th");
  temp.innerHTML = "Total";
  row.appendChild(temp);

  table.appendChild(row);

  for (let acc of data) {
    count++;
    // temp = document.createElement('p');
    // temp.innerHTML = count + '. ' + acc.name + ": " + acc.total.toLocaleString('en-US', {style : 'currency', currency : 'USD'});
    // document.getElementById('ranking').appendChild(temp);

    row = document.createElement("tr");

    temp = document.createElement("td");
    temp.innerHTML = count;
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.name;
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.profit.toLocaleString("en-US");
    row.appendChild(temp);

    temp = document.createElement("td");
    temp.innerHTML = acc.total.toLocaleString("en-US");
    row.appendChild(temp);

    tbody.appendChild(row);

    // if (count >= 5){
    //     break;
    // }
  }
  table.appendChild(tbody);
  document.getElementById("table-ranking-coin").innerHTML = "";
  document.getElementById("table-ranking-coin").appendChild(table);
}
