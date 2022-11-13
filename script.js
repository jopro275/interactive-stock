let companies = [
	{
		ticker: "PFE",
		amount: 0,
		price: 44.14,
		value: 0,
	},
	{
		ticker: "MRK", 
		amount: 0,
		price: 94.36,
		value: 0,
	},
	{
		ticker: "UNH",
		amount: 0,
		price: 515.51,
		value: 0,
	},
];

let stockAmount;

function generateTable() {
    document.getElementById('amountPfe').innerHTML = companies[0].amount;
	document.getElementById('amountMrk').innerHTML = companies[1].amount;
    document.getElementById('amountUnh').innerHTML = companies[2].amount;

	document.getElementById('valuePfe').innerHTML = `$${companies[0].price * companies[0].amount}`;
    document.getElementById('valueMrk').innerHTML = `$${companies[1].price * companies[1].amount}`;
    document.getElementById('valueUnh').innerHTML = `$${companies[2].price * companies[2].amount}`;
}

function buyStock(index) {
	stockAmount = prompt(`how much of ${companies[index].ticker} would you like to buy?`);
    stockAmount = Number(stockAmount);
	if(isNaN(stockAmount)){
		alert('wrong input');
		throw 'wrong input';
	}
	alert(`your total is $${stockAmount * companies[index].price}`);
    companies[index].amount += stockAmount;
	generateTable();
	
}
