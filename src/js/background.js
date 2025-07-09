let blockedSites = [];

function loadBlockedSites() {
  chrome.storage.local.get(['blockedSites'], (result) => {
    blockedSites = result.blockedSites || [];
  });
}

chrome.runtime.onInstalled.addListener(() => {
  loadBlockedSites();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    if (blockedSites.some(site => url.hostname.includes(site))) {
      return { redirectUrl: chrome.runtime.getURL("blocked.html") };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Inicialização
loadBlockedSites();
