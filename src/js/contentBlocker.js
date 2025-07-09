// This script checks if the current site is in the blocked list and redirects to blocked.html if it is.
console.log("[Site Blocker] contentBlocker.js loaded");

chrome.storage.local.get(['blockedSites'], (result) => {
  const sites = (result.blockedSites || []).map(s => s.toLowerCase().replace(/^www\./, ''));
  const currentHost = window.location.hostname.toLowerCase().replace(/^www\./, '');

  console.log("[Site Blocker] Verifying if", currentHost, "is on:", sites);

  if (sites.some(site => currentHost === site || currentHost.endsWith("." + site))) {
    console.log("[Site Blocker] Redirecting:", currentHost);
    window.location.href = chrome.runtime.getURL("blocked.html");
  }
});
