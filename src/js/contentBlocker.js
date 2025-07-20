// This script checks if the current site is in the blocked list and redirects to a blocked page if it is.
console.log("[Site Blocker] contentBlocker.js loaded");

chrome.storage.local.get(['blockedSites'], (result) => {
  const blockedSites = (result.blockedSites || []).map(site =>
    site.toLowerCase().replace(/^www\./, '')
  );

  const currentHost = window.location.hostname.toLowerCase().replace(/^www\./, '');

  console.log("[Site Blocker] Verifying if", currentHost, "is on:", blockedSites);

  const isBlocked = blockedSites.some(site => {
    return currentHost === site || currentHost.endsWith("." + site);
  });

  if (isBlocked) {
    console.log("[Site Blocker] Redirecting:", currentHost);
    window.location.href = chrome.runtime.getURL("blocked.html");
  }
});