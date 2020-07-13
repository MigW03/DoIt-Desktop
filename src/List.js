const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const list = document.getElementById("list");
const dataInput = document.getElementById("input");
const addButton = document.getElementById("addItemButton");

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
				renderTodos(retrievedList);
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

function renderTodos(data) {
	list.innerHTML = "";
	data.forEach((item) => {
		// Criar li class='listItem'
		let listItem = document.createElement("li");
		listItem.setAttribute("class", "listItem");

		// criar div com icone da estrela class='starIcon' icone=> class='fas fa-star'
		let starDiv = document.createElement("div");
		starDiv.setAttribute("class", "starIcon");
		let star = document.createElement("i");
		star.setAttribute("class", "fa fas-star");
		// let star = document.createTextNode("\u2605");
		starDiv.appendChild(star);

		// criar div com texto class='textContainer'
		let textDiv = document.createElement("div");
		textDiv.setAttribute("class", "textContainer");
		let itemText = document.createTextNode(item.title);
		textDiv.appendChild(itemText);

		// criar div com ione do lixo class='trashIcon' icone=> class='fas fa-trash-alt'
		let trashDiv = document.createElement("div");
		trashDiv.setAttribute("class", "trashIcon");
		let trash = document.createElement("i");
		trash.setAttribute("class", "fa fas-trash-alt");
		trashDiv.appendChild(trash);

		//Junta todas as partes do item da lista
		listItem.appendChild(starDiv);
		listItem.appendChild(textDiv);
		listItem.appendChild(trashDiv);

		//Coloca item na lista em si
		list.appendChild(listItem);
	});
}
