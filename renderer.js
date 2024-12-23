const { ipcRenderer } = require('electron');

document.getElementById('startBtn').addEventListener('click', async () => {
  const response = await ipcRenderer.invoke('start-recording');
  document.getElementById('status').textContent = response;
});

document.getElementById('stopBtn').addEventListener('click', async () => {
  const script = await ipcRenderer.invoke('stop-recording');
  document.getElementById('status').textContent = 'Recording stopped';
  document.getElementById('output').textContent = script;
});
