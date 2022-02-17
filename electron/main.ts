import path from 'path';
import { app, ipcMain, BrowserWindow, Menu } from 'electron';
import { configUploadHandler } from './handlers/uploadHandlers';
import 'reflect-metadata';

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null;

Menu.setApplicationMenu(null);

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.removeMenu();

  isDev
    ? mainWindow.loadURL('http://localhost:3000')
    : mainWindow.loadFile(path.join(__dirname, '../index.html'));

  if (isDev) {
    mainWindow.webContents.toggleDevTools();
  }

  ipcMain.handle('upload-config', configUploadHandler);

  mainWindow.once('ready-to-show', () => {
    if (mainWindow !== null) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
    ipcMain.removeHandler('upload-config');
  });
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
