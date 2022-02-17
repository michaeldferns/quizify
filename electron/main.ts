import path from 'path';
import { app, ipcMain, BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { configUploadHandler } from './handlers/uploadHandlers';
import 'reflect-metadata';

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 2000,
    y: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  isDev
    ? mainWindow.loadURL('http://localhost:3000')
    : mainWindow.loadFile(path.join(__dirname, '../index.html'));

  mainWindow.once('ready-to-show', () => {
    if (mainWindow !== null) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  ipcMain.handle('upload-config', configUploadHandler);
};

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow();
  }
});
