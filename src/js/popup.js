const siteInput = document.getElementById('siteInput');
const addBtn = document.getElementById('addBtn');
const siteList = document.getElementById('siteList');

// Função para normalizar domínio
function normalizeDomain(url) {
  try {
    if (!url.startsWith("http")) url = "https://" + url;
    const hostname = new URL(url).hostname.toLowerCase();
    return hostname.replace(/^www\./, '');
  } catch (e) {
    return null;
  }
}

// Renderiza a lista no popup
function renderList(sites) {
  siteList.innerHTML = '';
  sites.forEach((site, index) => {
    const li = document.createElement('li');
    li.textContent = site;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove');
    removeBtn.onclick = () => removeSite(index);

    li.appendChild(removeBtn);
    siteList.appendChild(li);
  });
}

// Carrega a lista do storage
function loadSites() {
  chrome.storage.local.get(['blockedSites'], (result) => {
    const sites = result.blockedSites || [];
    renderList(sites);
  });
}

// Atualiza as regras de bloqueio usando declarativeNetRequest
function updateRules(sites) {
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const removeRuleIds = existingRules.map(rule => rule.id);
    const newRules = sites.map((site, i) => ({
      id: i + 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { extensionPath: "/blocked.html" }
      },
      condition: {
        // Bloqueia domínio e subdomínios com http ou https
        urlFilter: `|http*://*.${site}/`,
        resourceTypes: ["main_frame"]
      }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules: newRules
    });
  });
}

// Adiciona um novo site à lista
function addSite() {
  const rawInput = siteInput.value.trim();
  const normalized = normalizeDomain(rawInput);
  if (!normalized) return;

  chrome.storage.local.get(['blockedSites'], (result) => {
    let sites = result.blockedSites || [];
    if (!sites.includes(normalized)) {
      sites.push(normalized);
      chrome.storage.local.set({ blockedSites: sites }, () => {
        updateRules(sites);
        loadSites();
      });
    }
  });

  siteInput.value = '';
}

// Remove site da lista
function removeSite(index) {
  chrome.storage.local.get(['blockedSites'], (result) => {
    let sites = result.blockedSites || [];
    sites.splice(index, 1);
    chrome.storage.local.set({ blockedSites: sites }, () => {
      updateRules(sites);
      loadSites();
    });
  });
}

// Event listeners
addBtn.addEventListener('click', addSite);
siteInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addSite();
  }
});

loadSites();
