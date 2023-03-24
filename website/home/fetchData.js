const API_KEY = `7A3z658_tQC6ahSk2OuVL8giMZitmCoD`;

function fetchData() {

  for (let i = 0; i < companies.length; i++) {
    let stockTicker = companies[i].ticker;
    getCompanyPrice(stockTicker, i);
  }

}

async function getCompanyPrice(tickerSimbol, index) {

  const alert = document.querySelector("#alert");
  let response = await fetch(`https://api.polygon.io/v2/aggs/ticker/
	${tickerSimbol}
	/prev?adjusted=true&apiKey=${API_KEY}`);

  if (!response.ok) {
    alert.innerHTML = "please try again in 1 minute";
    throw new Error(`HTTP error: ${response.status}`);
  }

  if (response) {
    alert.innerHTML = "";
  }

  let data = await response.json();
  companies[index].price = data.results[0].c;

  generateTable();
  
}
