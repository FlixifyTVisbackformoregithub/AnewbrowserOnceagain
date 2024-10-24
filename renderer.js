const { remote } = require('electron');

const webview = document.getElementById('webview');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const refreshButton = document.getElementById('refresh');
const urlInput = document.getElementById('url');

// Load URL when Enter key is pressed
urlInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const url = urlInput.value;
        // Check if the URL starts with 'http://' or 'https://'
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            urlInput.value = 'http://' + url; // Default to http
        }
        webview.loadURL(urlInput.value);
    }
});

// Navigation Buttons
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
