document.getElementById('start').addEventListener('click', () => {
    const interval = parseInt(document.getElementById('interval').value, 10) * 1000;
    if (isNaN(interval) || interval <= 0) {
      alert("Please enter a valid number greater than 0.");
      return;
    }
    chrome.storage.local.set({ refreshInterval: interval });
    chrome.runtime.sendMessage({ command: 'start' });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: 'stop' });
  });
  