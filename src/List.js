const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const { dialog } = require("electron").remote;

const list = document.getElementById("list");
const dataInput = document.getElementById("input");

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
				console.log(typeof retrievedList);
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
		listItem.setAttribute("key", item.key);

		// criar div com icone da estrela class='starIcon' icone=> class='fas fa-star'
		let starDiv = document.createElement("div");
		starDiv.setAttribute("class", "starIcon");
		let star = document.createElement("i");
		star.setAttribute(
			"class",
			item.important ? "material-icons orange" : "material-icons grey"
		);
		star.setAttribute("onclick", "console.log(`estrela: ${this.key.value}`)");
		star.appendChild(document.createTextNode("star"));
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
		trash.setAttribute("class", "material-icons");
		trash.setAttribute("onclick", `deleteItem('${item.key}')`);
		trash.appendChild(document.createTextNode("delete"));
		trashDiv.appendChild(trash);

		//Junta todas as partes do item da lista
		listItem.appendChild(starDiv);
		listItem.appendChild(textDiv);
		listItem.appendChild(trashDiv);

		//Coloca item na lista em si
		list.appendChild(listItem);
	});
}

function addItem() {
	let inputValue = dataInput.value;
	if (inputValue.length > 0) {
		firebase.auth().onAuthStateChanged((user) => {
			let newItem = {
				title: inputValue,
				key: inputValue + Math.random().toString(),
				important: false,
			};

			firestore
				.collection("users")
				.doc(user.email)
				.update({
					list: firebase.firestore.FieldValue.arrayUnion(newItem),
				})
				.then(() => {
					return (dataInput.value = ""), loadData();
				});
		});
	} else {
		dialog.showMessageBox({
			type: "info",
			title: "Digite algo",
			message: "digite algo antes de adicionar à lista",
		});
	}
}

function deleteItem(key) {
	console.log(`Item: ${key}`);
	firebase.auth().onAuthStateChanged((user) => {
		firestore
			.collection("users")
			.doc(user.email)
			.get()
			.then((data) => {
				let list = data.data().list;

				let filtered = list.filter((item) => item.key !== key);
				saveToFirebase(filtered);
			});
	});
}

function saveToFirebase(dataToSave) {
	firebase.auth().onAuthStateChanged((user) => {
		firestore.collection("users").doc(user.email).update({
			list: dataToSave,
		});
	});
}
