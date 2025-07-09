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

## ✅ To-Do List

- [ ] **Add password protection for unblock**  
      Implement a system that requires a password to remove a site from the blocked list — to prevent impulsive decisions.

- [ ] **Implement "Focus Mode" with a timer**  
      Create a feature where blocking is enforced for a specific duration (e.g., 25 minutes), ideal for productivity sessions.

- [ ] **Allow disabling blocking without deleting sites**  
      Add a toggle to temporarily pause the blocking without losing the saved list of sites.

- [ ] **Rebrand the extension with a better name**  
      Think of a more unique or appealing name that better reflects the purpose and tone of the extension.
