const firebase = require("firebase/app");
require("firebase/auth");
const { dialog, app } = require("electron").remote;
const Store = require("electron-store");
const store = new Store();
const exeName = path.basename(process.execPath);

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

const auth = firebase.auth();

function loadUserData() {
	auth.onAuthStateChanged((user) => {
		let emailField = document.getElementById("emailAdress");
		let userEmail = user.email;

		emailField.innerText = userEmail;
	});
	let autoLaunchData = store.get("autoLaunchEnabled");
	let checkbox = document.getElementById("autoLaunchInput");

	autoLaunchData ? (checkbox.checked = true) : (checkbox.checked = false);
}

function setAutoLaunch(value) {
	app.setLoginItemSettings({
		openAtLogin: value,
		path: exeName,
	});
	store.set("autoLaunchEnabled", value);
	console.log(store.get("autoLaunchEnabled"));
	// console.log(store.path); // No Mac mini o arquivo está em: /Users/miguel/Library/Application\ Support/desktop/config.json
}

function resetPassword() {
	auth.onAuthStateChanged((user) => {
		let userEmail = user.email;

		auth.sendPasswordResetEmail(userEmail).then(() => {
			dialog.showMessageBox({
				type: "info",
				title: "E-mail enviado com sucesso!",
				message: "Uma mensagem de verificação foi enviada para seu e-mail.",
			});

			window.location.href = "./Main.html";
		});
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

function goBack() {
	window.location.href = "./Main.html";
}
