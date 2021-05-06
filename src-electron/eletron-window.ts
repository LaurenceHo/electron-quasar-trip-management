import { BrowserWindow } from 'electron';
import path from 'path';

export const createWindow = async (): Promise<BrowserWindow> => {
  /**
   * Initial window options
   */
  let mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // @ts-ignore
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });
  // @ts-ignore
  await mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }
  return mainWindow;
};