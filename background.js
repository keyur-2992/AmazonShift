let refreshIntervalId = null;
let activeTabId = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.command === 'start') {
    if (activeTabId !== null) {
      chrome.storage.local.get(['refreshInterval'], (result) => {
        const interval = result.refreshInterval || 5000; // default to 5000ms (5 seconds)
        refreshIntervalId = setInterval(() => {
          chrome.scripting.executeScript({
            target: {tabId: activeTabId},
            func: () => location.reload()
          });
        }, interval);
        chrome.action.setIcon({path: "icon_active.png", tabId: activeTabId});
      });
    }
  } else if (message.command === 'stop') {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      refreshIntervalId = null;
      chrome.action.setIcon({path: "icon.png", tabId: activeTabId});
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  activeTabId = tab.id;
  chrome.action.setIcon({path: "icon_active.png", tabId: tab.id});
});
