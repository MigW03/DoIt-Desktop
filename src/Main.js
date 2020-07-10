const { dialog } = require("electron").remote;
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
			window.location.href = "./Main.html";
		} else {
			document.getElementById("loaderContainer").style.display = "none";
			document.getElementById("interactionArea").style.display = "flex";
		}
	});
}
function Logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			window.location.href = "./Initial.html";
		});
}

function Login() {
	let emailInput = document.getElementById("loginEmail");
	let passwordInput = document.getElementById("loginPassword");

	if (emailInput.value.length > 0 && passwordInput.value.length >= 0) {
		firebase
			.auth()
			.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
			.then(() => {
				window.location.href = "./Main.html";
			})
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					return alert("Este usuário não existe, cadastre-se primeiro!");
				}
				if (error.code === "auth/invalid-email") {
					return (
						alert("Este email é inválido, tente outro!"), emailInput.focus()
					);
				}
				if (error.code === "auth/wrong-password") {
					return (
						// alert("A senha ou email está incorreto, por favor tente novamente"),
						dialog.showMessageBox({
							type: "info",
							title: "teste",
							message: "Seua senha está incorreta",
						}),
						process.platform == "darwin"
							? passwordInput.focus()
							: (passwordInput.value = "")
						// passwordInput.focus()
					);
				}
				if (error.code === "auth/network-request-failed") {
					return alert("Sem conexão à rede, conecte-se e tente novamente");
				}
				if (error.code === "auth/too-many-requests") {
					return alert(
						"Você fez muitas tentativas de login sem sucesso, por favor, tente novamente mais tarde!"
					);
				}
				console.log(error);
				alert(
					"Houve um problema, por favor reinicie o aplicativo e tente novamente!"
				);
			});
	} else {
		alert("Digite seu email e senha antes de prosseguir");
	}
}

function forgotPassword() {
	let email = document.getElementById("loginEmail").value;
	if (email.length > 0) {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() =>
				alert("Um email para recuperação de senha foi enviado para você!")
			);
	} else {
		alert(
			"Digite o seu email no campo de 'email' para que possamos enviar o email de recuperação!"
		);
	}
}

function Register() {
	let emailInput = document.getElementById("registerEmail");
	let passwordInput = document.getElementById("registerPassword");

	if (emailInput.value.length > 0 && passwordInput.value.length >= 6) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
			.then(() => {
				alert("Usuário criado com sucesso");
				window.location.href = "./Main.html";
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					return (
						alert(
							"Este email já está sendo usado por algum usuário, por favor use outro!"
						),
						emailInput.focus()
					);
				}
				if (error.code === "auth/invalid-email") {
					return (
						alert("Este endereç de email é inválido, tente outro!"),
						emailInput.focus()
					);
				}
				if (error.code === "auth/network-request-failed") {
					return alert("Sem conexão à rede, conecte-se e tente novamente");
				}
				if (error.code === "auth/weak-password") {
					return (
						alert(
							"Essa senha está fraca, ela deve ter pelo menos 6 caracteres!"
						),
						passwordInput.focus()
					);
				}
				console.log(error);
				alert("Houve um erro no seu cadastro, por favor tente novamente!");
			});
	} else {
		alert(
			"Complete os campos para prosseguir, a senha deve ter pelo menos 6 caracteres!"
		);
		passwordInput.focus();
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
