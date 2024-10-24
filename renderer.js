const { remote } = require('electron');
const webviewContainer = document.getElementById('webviewContainer');
const tabBar = document.getElementById('tabBar');
const urlInput = document.getElementById('url');

let tabs = [];
let currentTabIndex = -1;

// Function to create a new tab
function createTab(url = 'https://www.duckduckgo.com') {
    const tabIndex = tabs.length;

    // Create a new webview element
    const webview = document.createElement('webview');
    webview.src = url;
    webview.style.width = '100%';
    webview.style.height = '100%';
    webview.id = `webview-${tabIndex}`;

    // Create a new tab element
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.innerHTML = `
        <img class="favicon" src="https://www.google.com/s2/favicons?sz=16&domain=${url}" />
        <span class="tab-title">Loading...</span>
        <button class="close-tab">✖</button>
    `;
    tab.addEventListener('click', () => {
        currentTabIndex = tabIndex;
        showTab(tabIndex);
    });
    tab.querySelector('.close-tab').addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(tabIndex);
    });

    // Append the tab to the tab bar
    tabBar.appendChild(tab);
    webviewContainer.appendChild(webview);
    tabs.push(webview);

    // Show the new tab
    showTab(tabIndex);
}

// Show tab function
function showTab(index) {
    tabs.forEach((tab, i) => {
        tab.style.display = i === index ? 'block' : 'none';
    });
    currentTabIndex = index;
    updateURLInput(index);
}

// Close tab function
function closeTab(index) {
    if (tabs.length > 1) {
        tabs[index].remove();
        tabBar.removeChild(tabBar.children[index]);
        tabs.splice(index, 1);
        if (currentTabIndex === index) {
            // Show the next tab if closing the current one
            currentTabIndex = Math.max(0, index - 1); 
            showTab(currentTabIndex);
        }
    }
}

// Update URL input when navigating
function updateURLInput(index) {
    const webview = tabs[index];
    webview.addEventListener('did-navigate', (event) => {
        const title = event.title || "Untitled";
        const faviconURL = `https://www.google.com/s2/favicons?sz=16&domain=${event.url}`;
        const tab = tabBar.children[index];
        tab.querySelector('.tab-title').innerText = title;
        tab.querySelector('.favicon').src = faviconURL;
    });
    urlInput.value = webview.src;

    // Allow navigation using the address bar
    urlInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const url = urlInput.value;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                urlInput.value = 'http://' + url; // Default to http
            }
            webview.loadURL(urlInput.value);
        }
    });
}

// Add event listeners to buttons
document.getElementById('back').addEventListener('click', () => {
    if (tabs[currentTabIndex]) {
        tabs[currentTabIndex].goBack();
    }
});

document.getElementById('forward').addEventListener('click', () => {
    if (tabs[currentTabIndex]) {
        tabs[currentTabIndex].goForward();
    }
});

document.getElementById('refresh').addEventListener('click', () => {
    if (tabs[currentTabIndex]) {
        tabs[currentTabIndex].reload();
    }
});

document.getElementById('new-tab').addEventListener('click', () => {
    createTab();
});

// Create the first tab on load
createTab();
