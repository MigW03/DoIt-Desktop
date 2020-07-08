const firebase = require("firebase/app");
const { auth } = require("firebase/app");
require("firebase/auth");

firebase.initializeApp({
	apiKey: "AIzaSyBiSc-DqKtwdz7HZgY7pPUKhWl98e9Ee-w",
	authDomain: "to-do-app-d4a0c.firebaseapp.com",
	databaseURL: "https://to-do-app-d4a0c.firebaseio.com",
	projectId: "to-do-app-d4a0c",

	storageBucket: "to-do-app-d4a0c.appspot.com",
	messagingSenderId: "95028475262",
	appId: "1:95028475262:web:bf49a1d5c1b5bbb94def2f",
	measurementId: "G-6SS9CREWY4",
});

function isLogedIn() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			alert(`Email: ${user.email}`);
		} else {
			alert("Faça o login primeiro");
		}
	});
}

function Login() {
	let email = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;

	if (email.length > 0 && password.length > 0) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => alert("Login realizado"))
			.catch((error) => {
				console.log(error);
				alert("Algo deu errado, por favor, tente novamente!");
			});
	} else {
		alert("Digite seu email e senha antes de prosseguir");
	}
}

function Register() {
	let email = document.getElementById("registerEmail").value;
	let password = document.getElementById("registerPassword").value;

	if (email.length > 0 && password.length > 0) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				alert("Usuário criado com sucesso");
			})
			.catch((error) => {
				console.log(error);
				alert("Houve um erro no seu cadastro, por favor tente novamente!");
			});
	} else {
		alert("Complete os campos para prosseguir!");
	}
}

function goToLogin() {
	window.location.href = "./Login.html";
}

function goToRegister() {
	window.location.href = "./Register.html";
}

function goToHome() {
	window.location.href = "./Initial.html";
}
