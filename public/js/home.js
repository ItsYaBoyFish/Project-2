// Variables for transitions on UI
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// End of UI variables for Transitions

var signInFormBTN = document.querySelector('#signInBTN');
var signUpFormBTN = document.querySelector('#signUpBTN');

signInFormBTN.addEventListener('click', function() {
	var username = document.getElementById('username');
	var password = document.getElementById('password');

	var data = {
		username: username.value,
		password: password.value
	}

	console.log(data);
	axios.post('/loginTest', data).then(function(results) {
		console.log(results);
	})
})

signUpFormBTN.addEventListener('click', function() {
	var email = document.querySelector('#create-email');
	var username = document.querySelector('#create-username');
	var password = document.querySelector('#create-password');

	var data = {
		email: email.value,
		username: username.value,
		password: password.value
	}

	console.log(data);
	axios.post('/saveNewUserRouteHere', data).then(function(results) {
		console.log(results);
	})
})
