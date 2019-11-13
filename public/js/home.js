
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

signInFormBTN.addEventListener('click', function(e) {
	e.preventDefault();
	var username = document.getElementById('username');
	var password = document.getElementById('password');

	var data = {
		username: username.value,
		password: password.value
	}

	// console.log(data);
	axios.post("/loginTest", data).then(function(response) {
		// console.log(response.data);
		var user = response.data;
		console.log(user);

		// Check to see if the response was successful. 
		if (user.successful === false) {
			displayErrorMessage(user.message);
			setTimeout(closeErrorMessage, 3000);
		} else {
			sessionStorage.setItem('lipin-username', user.userInfo.username);
			sessionStorage.setItem('lipin-userID', user.userInfo.userID);
			location.href = `http://${location.host}/dashboard`;
		}
	})
})

signUpFormBTN.addEventListener('click', function(e) {
	e.preventDefault();
	var email = document.querySelector('#create-email');
	var username = document.querySelector('#create-username');
	var password = document.querySelector('#create-password');

	var data = {
		email: email.value,
		username: username.value,
		password: password.value
	}

	console.log(data);
	axios.post('/createUser', data).then(function(response) {
		// console.log(response.data);
		var userInfo = response.data;
		sessionStorage.setItem('lipin-username', userInfo.username);
		sessionStorage.setItem('lipin-userID', userInfo.userID);
		location.href = `http://${location.host}/dashboard`;
	})
})


function displayErrorMessage(message) {
	const errorMessageDisplay = document.querySelector('#error-message');
	errorMessageDisplay.style.removeProperty('display')
	errorMessageDisplay.innerHTML = message;
}

function closeErrorMessage() {
	const errorMessageDisplay = document.querySelector('#error-message');
	errorMessageDisplay.style.display = "none";
}