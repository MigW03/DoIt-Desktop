const { app, BrowserWindow } = require("electron");

function createWindow() {
	let win = new BrowserWindow({
		show: false,
		title: "DoIt",
		width: 420,
		maxWidth: 420,
		minWidth: 330,
		height: 750,
		maxHeight: 750,
		minHeight: 380,
		maximizable: false,
		fullscreenable: false,
		// alwaysOnTop: true,
		hasShadow: false,
		titleBarStyle: "hidden",
		webPreferences: {
			devTools: false,
			nodeIntegration: true,
		},
	});

	win.loadFile("src/index.html");
	win.once("ready-to-show", () => {
		win.show();
	});
}

app.whenReady().then(createWindow);
