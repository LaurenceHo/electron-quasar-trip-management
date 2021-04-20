import electron, { app, BrowserWindow, nativeTheme } from 'electron';
import path from 'path';
import TripStore from '../src/database/trip-store';
import TripDayStore from '../src/database/trip-day-store';
import EventStore from '../src/database/event-store';

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'));
  }
} catch (_) {}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/***** IPC communication *****/
const ipcMain = electron.ipcMain;
const tripStore = new TripStore('trip.db');
const tripDayStore = new TripDayStore('trip_day.db');
const eventStore = new EventStore('event.db');

/*** Trip store ***/
ipcMain.handle('createTrip', async (event, param) => {
  return await tripStore.create(param);
});

ipcMain.handle('updateTrip', async (event, ...param) => {
  return await tripStore.update(...param);
});

ipcMain.handle('findAllTrips', async () => {
  return tripStore.findAll();
});

ipcMain.handle('findTripsByStarred', async () => {
  return tripStore.findByStarred();
});

ipcMain.handle('findTripsByArchived', async () => {
  return tripStore.findByArchived();
});

ipcMain.handle('findTripsByTime', async (event, param) => {
  return tripStore.findByTime(param);
});

/*** TripDay store ***/
ipcMain.handle('createTripDay', async (event, param) => {
  return await tripDayStore.create(param);
});

ipcMain.handle('updateTripDay', async (event, ...param) => {
  return await tripDayStore.update(...param);
});

ipcMain.handle('findTripDaysByTrip', async (event, param) => {
  return tripDayStore.findByTrip(param);
});

/*** Event store ***/
ipcMain.handle('createEvent', async (event, param) => {
  return await eventStore.create(param);
});

ipcMain.handle('updateEvent', async (event, ...param) => {
  return await eventStore.update(...param);
});

ipcMain.handle('findEventsByTripDay', async (event, param) => {
  return eventStore.findByTripDay(param);
});

ipcMain.handle('findEventsByCategory', async (event, param) => {
  return eventStore.findByCategory(param);
});
