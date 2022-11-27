let btnTd;
let btn;
let formElement;

window.onload = function () {
	generateTable();
	displayMarketStatus();
}

function generateTable() {
	let tableBodyElement = document.getElementById('table-body');
	tableBodyElement.innerHTML = null;

	for (let i = 0; i < companies.length; i++) {
		var company = companies[i];
		var trElement = document.createElement('tr');

		createAndAppendTd(trElement, company.name);
		createAndAppendTd(trElement, company.isUsComapny ? 'Yes' : 'No');
		createAndAppendTd(trElement, company.ticker.toUpperCase());
		createAndAppendTd(trElement, `$${company.price}`);
		createAndAppendTd(trElement, company.amount);
		createAndAppendTd(trElement, `$${company.value.toFixed(2)}`);

		createAndAppendBtn(trElement, company.amount ? 'buy more' : 'buy', 'buy_btn', function () { buyStock(i); });
		createAndAppendBtn(trElement, 'sell', 'sell_btn', function () { sellStock(i); });
		createAndAppendBtn(trElement, 'remove', 'remove_btn', function () { removeStock(i); });
		tableBodyElement.append(trElement);
	}
}

function createAndAppendTd(trElement, innerText) {
	let tdElement = document.createElement('td');
	tdElement.innerText = innerText;
	trElement.append(tdElement);
}

function createAndAppendBtn(trElement, innerText, className, callback) {
	btnTd = document.createElement('td');
	btn = document.createElement('button');
	btnTd.append(btn);
	btn.innerText = innerText;
	btn.classList.add(className);
	trElement.append(btnTd);
	btn.addEventListener('click', callback);
}

function buyStock(index) {
	let amount = Number(
		prompt(
			`How many ${companies[index].name} stocks would you like to buy?`
		)
	);
	if (isNaN(amount)) {
		alert("Invalid amount. Please enter a valid amount.");
	} else {
		companies[index].amount += amount;
		companies[index].value = companies[index].amount * companies[index].price;
		generateTable();
	}
}

function sellStock(index) {
	if (companies[index].amount <= 0) {
		alert(`you dont have any ${companies[index].name} stock to sell`);
		throw 'invalid'
	}
	let amount = Number(
		prompt(
			`How many ${companies[index].name} stocks would you like to sell?`
		)
	);
	if (isNaN(amount)) {
		alert("Invalid amount. Please enter a valid amount.");
		throw 'invalid'
	} else if (companies[index].amount < amount) {
		alert(`you only have ${companies[index].amount} ${companies[index].name} stock to sell`);
		throw 'invalid'
	} else {

		companies[index].amount -= amount;
		companies[index].value = companies[index].amount * companies[index].price;

		generateTable();
	}
}

function removeStock(index) {
	companies.splice(index, 1);
	generateTable();
}

function showAddCompanyForm() {
	document.getElementById('addCompanyForm').style.display = 'block';
}

function submitForm() {
	formElement = document.getElementById('addCompanyForm');
	let fd = new FormData(formElement);
	let company = {};
	company.name = fd.get('name');
	company.isUsComapny = fd.get('isUsCompany') == 'on';
	company.ticker = fd.get(`ticker`);
	company.price = fd.get('price');
	company.amount = 0;
	company.value = 0;
	companies.push(company);
	generateTable();
	formElement.reset();
}

function returMarketStatus() {
	let body = document.getElementById('body');
	let p = document.getElementById('p');
	let currentTime = new Date();
	let marketOpen = new Date();
	marketOpen.setHours(9);
	marketOpen.setMinutes(30);
	marketOpen.setSeconds(0);
	let marketClose = new Date();
	marketClose.setHours(16);
	marketClose.setMinutes(0);
	marketClose.setSeconds(0);
	let day = currentTime.getDay();

	if (day == 6) {
		p.innerText = 'market closed on saturday';
		body.style.background = "rgb(46, 5, 252)";
		body.style.color = 'white'
		return false;
	} else if (day == 0) {
		p.innerText = 'market closed on sunday';
		body.style.background = "rgb(46, 5, 252)";
		body.style.color = 'white'
		return false;
	} else if (currentTime < marketOpen) {
		convertMs(`market opens in`, marketOpen - currentTime);
		body.style.background = "rgb(46, 5, 252)";
		body.style.color = 'white'
		return false;
	} else if (currentTime >= marketClose) {
		convertMs(`market already closed for`, currentTime - marketClose);
		body.style.background = "rgb(46, 5, 252)";
		body.style.color = 'white';
		return false;
	} else if (currentTime >= marketOpen && currentTime <= marketClose && day > 0 && day <= 5) {
		convertMs(`market already open for`, currentTime - marketOpen);
		body.style.background = "rgb(169, 168, 240)";
		body.style.color = 'black';
		return true;
	}
}

function displayMarketStatus() {
	let marketStatus = returMarketStatus() ? `market is currently open` : `market is currently closed`;
	document.getElementById("market_status").innerHTML = marketStatus;
}

function convertMs(innerTxt, num) {
	p = document.getElementById('p');
	let s = Math.floor((num / 1000) % 60);
	let mn = Math.floor(num / (1000 * 60) % 60);
	let hr = Math.floor(num / (1000 * 60 * 60) % 60);
	if (s < 10) {
		p.innerText = `${innerTxt} ${hr}:${mn}:0${s} hours`
	} else if (mn < 10) {
		p.innerText = `${innerTxt} ${hr}:0${mn}:${s} hours`
	} else if (hr < 10) {
		p.innerText = `${innerTxt} 0${hr}:${mn}:${s} hours`
	} else {
		p.innerText = `${innerTxt} ${hr}:${mn}:${s} hours`
	}
}

setInterval(displayMarketStatus, 1000);