# 🚫 Site Blocker - Chromium Extension

**Site Blocker** is a lightweight and privacy-friendly browser extension for Chromium-based browsers (Chrome, Edge, Brave, etc.) that blocks access to websites you choose.
I made this extension to keep me from distractions, it's pretty bare bones, feel free to contribute to this little project.

---

## ✨ Features

- Block websites defined by the user
- Redirects blocked sites to a custom "Blocked" page
- Popup UI for adding/removing sites dynamically
- Persistent list using `chrome.storage`
- Built with Manifest V3 (`declarativeNetRequest`)
- Includes content script fallback for better reliability (e.g., when clicking links from Google)
