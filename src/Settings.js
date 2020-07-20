function goBack() {
	window.location.href = "./Main.html";
}

function Logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			window.location.href = "./Initial.html";
		});
}
