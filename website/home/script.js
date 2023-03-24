function startProgram() {

  fetchData();

  setInterval(() => {

    displayMarketStatus();
    
  }, 1000);

}

startProgram();

function generateTable() {

  let tableBodyElement = document.querySelector("#table_body");
  tableBodyElement.innerHTML = null;

  for (let i = 0; i < companies.length; i++) {
    let company = companies[i];

    var trElement = document.createElement("tr");

    createAndAppendImg(trElement, company.logo);

    createAndAppendTd(trElement, company.name);

    createAndAppendTd(trElement, company.isUsComapny ? "Yes" : "No");

    createAndAppendTd(trElement, company.ticker.toUpperCase());

    createAndAppendTd(trElement, `$${company.price}`);

    createAndAppendTd(trElement, company.amount);

    createAndAppendTd(trElement, `$${company.value.toFixed(2)}`);

    createAndAppendBtn(trElement, company.amount ? "buy more" : "buy", "buy_btn", () => buyStock(i));

    createAndAppendBtn(trElement, "sell", "sell_btn", () => sellStock(i));

    createAndAppendBtn(trElement, "remove", "remove_btn", () => removeStock(i));

    tableBodyElement.append(trElement);
  }

}

function createAndAppendTd(trElement, innerText) {

  let tdElement = document.createElement("td");
  tdElement.innerText = innerText;
  trElement.append(tdElement);

}

function createAndAppendImg(trElement, imgSrc) {

  let myImage = new Image(40);
  myImage.src = imgSrc;
  trElement.append(myImage);

}

function createAndAppendBtn(trElement, innerText, className, callback) {

  const buttonTdElement = document.createElement("td");
  const btn = document.createElement("button");

  buttonTdElement.append(btn);
  btn.innerText = innerText;
  btn.classList.add(className);
  trElement.append(buttonTdElement);
  btn.addEventListener("click", callback);

}

function buyStock(index) {

  validateBuyOrSell(index);

  let buyingAmount = Number(
    prompt(`How many ${companies[index].name} stocks would you like to buy?`)
  );

  if (!validateNumber(buyingAmount)) {
    companies[index].amount += buyingAmount;
    companies[index].value = companies[index].amount * companies[index].price;
    generateTable();
  }

}

function sellStock(index) {

  validateBuyOrSell(index);

  if (companies[index].amount <= 0) {
    alert(`you dont have any ${companies[index].name} stock to sell`);
    return;
  }

  let sellingAmount = Number(
    prompt(`How many ${companies[index].name} stocks would you like to sell?`)
  );

  if (!validateNumber(sellingAmount) && !validateSell(sellingAmount, index)) {
    companies[index].amount -= sellingAmount;
    companies[index].value = companies[index].amount * companies[index].price;
    generateTable();
  }

}

function validateNumber(number) {

  if (isNaN(number)) {
    alert("Invalid amount. Please enter a valid amount.");
    return true;
  }

}

function validateBuyOrSell(index) {

  if (companies[index].price == "0.00") {
    alert("please try again in 1 minute");
    return;
  }

  if (!checkMarketOpen()) {
    alert("market closed!");
    return;
  }

}

function validateSell(sellingAmount, index) {

  if (companies[index].amount < sellingAmount) {
    alert(`you only have ${companies[index].amount} ${companies[index].name} stock to sell!`);
    return true;
  }

}

function removeStock(index) {

  companies.splice(index, 1);
  generateTable();

}

function showAddCompanyForm() {

  const form = document.querySelector("#add_company_form");
  if (form.style.display == "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }

}

function submitForm() {

  const formElement = document.querySelector("#add_company_form");
  let formData = new FormData(formElement);
  let company = {};

  company.name = formData.get("name");
  company.isUsComapny = formData.get("is_us_company") == "on";
  company.ticker = formData.get(`ticker`);
  company.price = formData.get("price");
  company.amount = 0;
  company.value = 0;
  company.logo = 0;

  companies.push(company);
  getCompanyPrice(company.ticker.toUpperCase(), companies.length - 1);
  generateTable();
  formElement.reset();
}
