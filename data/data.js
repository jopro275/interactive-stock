let companies = [
	{
		name: 'pfizer',
		isUsComapny: true,
		ticker: 'PFE',
		price: '0.00',
		amount: 0,
		value: 0,
		logo: '../img/pfizer-logo.png'
	},
	{
		name: 'merk',
		isUsComapny: true,
		ticker: 'MRK',
		price: '0.00 ',
		amount: 0,
		value: 0,
		logo: '../img/mrk-logo.png'
	},
	{
		name: 'united healthcare',
		isUsComapny: true,
		ticker: 'UNH',
		price: '0.00 ',
		amount: 0,
		value: 0,
		logo: '../img/unh-logo.png'
	},
	{
		name: 'molina healthcare',
		isUsComapny: true,
		ticker: 'MOH',
		price: '0.00 ',
		amount: 0,
		value: 0,
		logo: '../img/moh-logo.png'
	},{
		name: 'avantor',
		isUsComapny: true,
		ticker: 'AVTR',
		price: '0.00',
		amount: 0,
		value: 0,
		logo: '../img/avtr-logo.png'
	}

];

const apiKey = `7A3z658_tQC6ahSk2OuVL8giMZitmCoD`;

for (let i = 0; i < companies.length; i++) {
	let stockTicker = companies[i].ticker;
	getData(stockTicker, i);
}

async function getData(tickerSimbol, index) {

	let response = await fetch(`https://api.polygon.io/v2/aggs/ticker/
	${tickerSimbol}
	/prev?adjusted=true&apiKey=${apiKey}`);

	if (!response.ok) {
		document.querySelector('#alert').innerHTML = 'please try again in 1 minute'
		throw new Error(`HTTP error: ${response.status}`);
	}
	if (response) {
		document.querySelector('#alert').innerHTML = ''
	}

	let data = await response.json();
	console.log(data);
	companies[index].price = data.results[0].c;
	generateTable();
}
