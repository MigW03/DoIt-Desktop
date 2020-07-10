const { dialog } = require("electron").remote;
const firebase = require("firebase/app");
const { auth } = require("firebase/app");
require("firebase/auth");
const isMac = process.platform == "darwin";

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
					return dialog.showMessageBox({
						type: "info",
						title: "Usuário inválido",
						message: "Este usuário não existe, cadastre-se primeiro!",
					});
				}
				if (error.code === "auth/invalid-email") {
					return (
						dialog.showMessageBox({
							type: "info",
							title: "Email inválido",
							message: "Este email é inválido, por favor tente outro",
						}),
						isMac ? emailInput.focus() : (emailInput.value = "")
					);
				}
				if (error.code === "auth/wrong-password") {
					return (
						dialog.showMessageBox({
							type: "info",
							title: "Dados incorretos",
							message:
								"Seu email ou senha está incorreta, por favor digite novamente",
						}),
						isMac ? passwordInput.focus() : (passwordInput.value = "")
					);
				}
				if (error.code === "auth/network-request-failed") {
					return dialog.showMessageBox({
						type: "info",
						title: "Sem conexão",
						message: "Sem conexão à rede, conecte-se e tente novamente!",
					});
				}
				if (error.code === "auth/too-many-requests") {
					return dialog.showMessageBox({
						type: "info",
						title: "Muitas tentativas",
						message:
							"Você fez muitas tentativas de login sem sucesso, por favor tente novamente mais tarde!",
					});
				}
				console.log(error);
				dialog.showMessageBox({
					type: "info",
					title: "Opps!!",
					message:
						"Houve um problema, por favor reinicie o aplicativo e tente novamente!",
				});
			});
	} else {
		dialog.showMessageBox({
			type: "info",
			title: "Campos obrigatórios",
			message: "Digite seus email e senha antes de prosseguir!",
		});
	}
}

function forgotPassword() {
	let email = document.getElementById("loginEmail").value;
	if (email.length > 0) {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() =>
				dialog.showMessageBox({
					type: "info",
					title: "Email enviado com sucesso",
					message:
						"Um email para redefinir sua senha foi enviado para seu email!",
				})
			);
	} else {
		dialog.showMessageBox({
			type: "info",
			title: "Digite seu email",
			message:
				"Digite o seu email no campo de 'email' para que possamos enviar o email de recuperação!",
		});
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
				dialog.showMessageBox({
					type: "info",
					title: "Usuário criado",
					message: "Seu usuário foi ciado com sucesso!",
				});
				window.location.href = "./Main.html";
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					return (
						dialog.showMessageBox({
							type: "info",
							title: "Usuário existente",
							message:
								"Este email já está sendo usado por algum usuário, por favor use outro endereço!",
						}),
						isMac ? emailInput.focus() : (emailInput.value = "")
					);
				}
				if (error.code === "auth/invalid-email") {
					return (
						dialog.showMessageBox({
							type: "info",
							title: "Email inválido",
							message:
								"Esse endereço de email é inválido, por favor tente outro!",
						}),
						isMac ? emailInput.focus() : (emailInput.value = "")
					);
				}
				if (error.code === "auth/network-request-failed") {
					return dialog.showMessageBox({
						type: "info",
						title: "Sem conexão",
						message: "Sem conexão à rede, conecte-se e tente novamente",
					});
				}
				if (error.code === "auth/weak-password") {
					return (
						dialog.showMessageBox({
							type: "info",
							title: "Senha fraca",
							message:
								"Essa senha está fraca, ela deve conter pelo menos 6 caracteres!",
						}),
						isMac ? passwordInput.focus() : (passwordInput.value = "")
					);
				}
				console.log(error);
				dialog.showMessageBox({
					type: "info",
					title: "Opps!!",
					message:
						"Houve um erro durante o seu cadastro, por favor tente novamente!",
				});
			});
	} else {
		dialog.showMessageBox({
			type: "info",
			title: "Campos obrigatórios",
			message:
				"Complete os campos para prosseguir, a senha deve ter pelo menos 6 caracteres",
		});
		isMac ? passwordInput.focus() : (passwordInput.value = "");
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
