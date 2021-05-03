import { app, BrowserWindow } from 'electron';
import { Nullable } from 'src/types/type';
import { enableIPC } from './eletron-ipc';
import { createWindow } from './eletron-window';

let window: Nullable<BrowserWindow> = null;

app.allowRendererProcessReuse = true;

app.on('ready', async () => {
  enableIPC();
  window = await createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (!window) {
    window = await createWindow();
    window.on('closed', () => {
      window = null;
    });
  }
});
