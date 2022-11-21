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

		createAndAppendBtn(trElement, company.amount ? 'buy more' : 'buy', 'buy_btn', buyStock(i));
		createAndAppendBtn(trElement, 'sell', 'sell_btn', sellStock(i));
		createAndAppendBtn(trElement, 'remove', 'remove_btn', removeStock(i));

		/*btn.addEventListener('click', function () {
			buyStock(i);
		});

		createAndAppendBtn(trElement, 'sell', 'sell_btn');
		btn.addEventListener('click', function () {
			sellStock(i);
		});

		createAndAppendBtn(trElement, 'remove', 'remove_btn');
		btn.addEventListener('click', function () {
			removeStock(i);
		});
		*/
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
	btn.addEventListener('click', callback());
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
	} else {
		companies[index].amount -= amount;
		companies[index].value = companies[index].amount * companies[index].price;
		generateTable();
	}
}

function removeStock(index) {
	companies.splice(index, 1);
	console.log(companies.length);
	generateTable();
}

function showAddCompanyForm() {
	document.getElementById('addCompanyForm').style.display = 'block';
}

let formElement;
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

let btnTd;
let btn;
generateTable();

