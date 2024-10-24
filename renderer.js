const { remote } = require('electron');

const webview = document.getElementById('webview');
const goButton = document.getElementById('go');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const refreshButton = document.getElementById('refresh');
const urlInput = document.getElementById('url');

goButton.addEventListener('click', () => {
    webview.loadURL(urlInput.value);
});

backButton.addEventListener('click', () => {
    webview.goBack();
});

forwardButton.addEventListener('click', () => {
    webview.goForward();
});

refreshButton.addEventListener('click', () => {
    webview.reload();
});

// Update the URL input when the webview navigates
webview.addEventListener('did-navigate', (event) => {
    urlInput.value = event.url;
});
