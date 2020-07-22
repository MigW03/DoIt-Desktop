const { app, BrowserWindow, Menu, shell } = require("electron");
const firebase = require("firebase/app");

function createWindow() {
	const isMac = process.platform === "darwin";
	let win = new BrowserWindow({
		show: false,
		icon: "./assets/icon/icon.png",
		title: "DoIt",
		width: 420,
		maxWidth: 420,
		minWidth: 330,
		height: 750,
		maxHeight: 750,
		minHeight: 380,
		maximizable: false,
		fullscreenable: false,
		hasShadow: false,
		titleBarStyle: "hidden",
		webPreferences: {
			devTools: false,
			nodeIntegration: true,
		},
	});

	win.loadFile("src/pages/Initial.html");
	win.once("ready-to-show", () => {
		win.show();
	});

	var menu = Menu.buildFromTemplate([
		{
			label: "Menu",
			submenu: [
				{
					label: "Sobre DoIt",
					role: "about",
				},
				{
					label: "Ver aplicativo Android",
					click() {
						shell.openExternal(
							"https://play.google.com/store/apps/details?id=com.doit.webermiguel"
						);
					},
				},
				{ type: "separator" },
				{
					label: "Serviços",
					role: "services",
				},
				{ type: "separator" },
				{
					accelerator: isMac ? "Cmd + Q" : "Ctrl + Q",
					label: "Encerrar DoIt",
					click() {
						app.quit();
					},
				},
			],
		},
		{
			label: "Janela",
			submenu: [
				{
					label: "Minimizar janela",
					accelerator: "CmdOrCtrl + M",
					role: "minimize",
				},
			],
		},
	]);

	Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
