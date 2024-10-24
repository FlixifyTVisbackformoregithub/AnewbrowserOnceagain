const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Enables access to Node.js
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);
