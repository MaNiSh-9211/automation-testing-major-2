// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');
// const { startRecording, stopRecording } = require('./puppeteer-script');

// let mainWindow;

// app.on('ready', () => {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'renderer.js'),
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   mainWindow.loadFile('index.html');
// });

// // Handle IPC calls
// ipcMain.handle('start-recording', async () => {
//   return await startRecording();
// });

// ipcMain.handle('stop-recording', async () => {
//   return await stopRecording();
// });


const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startRecording, stopRecording } = require('./puppeteer-script');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false, // Disable native frame
    resizable: true, // Allow resizing
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Remove the default file menu
  mainWindow.setMenu(null);

  mainWindow.loadFile('index.html');
});

// Handle IPC calls
ipcMain.handle('start-recording', async () => {
  return await startRecording();
});

ipcMain.handle('stop-recording', async () => {
  return await stopRecording();
});
