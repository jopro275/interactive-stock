const RULES = [
	{
		name: "valid_min8",
		validator: function (password) {
			if (password.length < 8) return false
			else return true
		}
	},
	{
		name: "valid_upper",
		validator: (password) => password !== password.toLowerCase(),
	},
	{
		name: "valid_lower",
		validator: (password) => password !== password.toUpperCase(),
	},
	{
		name: "valid_number",
		validator: (password) => /\d/g.test(password),
	}
];

window.onload = function () {
	document.getElementById('sign_up_password').addEventListener('change', function () {
		let password = document.getElementById('sign_up_password').value;
		Validate(password);
	});
}

function Validate(password) {
	for (let rule of RULES) {
		if (rule.validator(password)) {
			document.getElementById(rule.name).style.color = '#b19025';
		} else {
			document.getElementById(rule.name).style.color = 'balck';
		}
	}
	
}



function signUpSubmit() {
	if (checkSubmit()) {
		let formElement = document.querySelector(".sign_up_form");
		let fd = new FormData(formElement);
		userData.name = fd.get('name');
		userData.password = fd.get('password');
		window.location.href = '../home/index.html';
	}
}

//returns true if name is filled out

function returnNameInput() {
	if (document.querySelector('#sign_up_name').value == ''){
		document.querySelector('#alert_message').innerHTML = 'plaese put in your name';
		return false
	}
	else return true
}

//returns true if password is fiiled out

function returnPassInput() {
	if (document.querySelector('#sign_up_password').value == '') {
		document.querySelector('#alert_message').innerHTML = 'plaese put in a password';
		return false;
	} 
	else return true;
}

//returns true if password is valid

function checkValid() {
	let pass = document.querySelector('#sign_up_password').value;
	for (let rule of RULES) {
		if (!rule.validator(pass)) {
			document.querySelector('#alert_message').innerHTML = 'password too week';
			return false;
		}
	}
	return true;
}

//returns true if confirm password is the same as password

function checkConfirmPassword() {
	let firstPass = document.querySelector('#sign_up_password').value;
	let secondPass = document.querySelector('#sign_up_confirm_password').value;
	if (firstPass != secondPass) {
		document.querySelector('#alert_message').innerHTML = 'password dosnt match';
		return false
	}
	else return true
}

//returns true if all of the above is true 

function checkSubmit() {
	if (returnNameInput() && returnPassInput()
		&& checkValid() && checkConfirmPassword()) return true
	else return false
}
























//if (document.querySelector('#sign_up_password').value == '') return false;

/*
function confirmedPassword(pass, cpass) {
	if (pass !== cpass) {
		alert('password dosnt match');
		throw 'error';
	} else if (pass === cpass) {

	}
}
/*

	//userData.push(user);

	document.getElementById('user_name').innerHTML = userData.name;
	//confirmedPassword(userData.password, userData.cPassword);
	//formElement.reset();
	*/