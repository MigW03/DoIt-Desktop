const { app, BrowserWindow, Menu, shell } = require("electron");

function createWindow() {
	const isMac = process.platform === "darwin";
	let win = new BrowserWindow({
		show: false,
		// title: "DoIt",
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
					accelerator: isMac ? "Cmd + Q" : "Cntrl + Q",
					label: "Encerrar DoIt",
					click() {
						app.quit();
					},
				},
			],
		},
	]);

	Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
