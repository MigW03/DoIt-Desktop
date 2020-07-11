const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

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

const firestore = firebase.firestore();
const auth = firebase.auth();

function loadData() {
	auth.onAuthStateChanged((user) => {
		userEmail = user.email;
		firestore
			.collection("users")
			.doc(userEmail)
			.onSnapshot((data) => {
				let retrievedList = data.data().list;
				console.log(retrievedList);
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
