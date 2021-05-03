import electron from 'electron';
import EventStore from '../src/database/event-store';
import { EventSchema, TripDaySchema, TripSchema } from '../src/database/schemas';
import TripDayStore from '../src/database/trip-day-store';
import TripStore from '../src/database/trip-store';

export const enableIPC = () => {
  const ipcMain = electron.ipcMain;
  const tripStore = new TripStore('trip.db', TripSchema);
  const tripDayStore = new TripDayStore('trip_day.db', TripDaySchema);
  const eventStore = new EventStore('event.db', EventSchema);

  /*** Trip store ***/
  ipcMain.handle('createTrip', async (event, param) => {
    return await tripStore.create(param);
  });

  ipcMain.handle('updateTrip', async (event, ...param) => {
    // @ts-ignore
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

  ipcMain.handle('findTripsByTime', async (event, param: 'future' | 'current' | 'past') => {
    return tripStore.findByTime(param);
  });

  /*** TripDay store ***/
  ipcMain.handle('createTripDay', async (event, param) => {
    return await tripDayStore.create(param);
  });

  ipcMain.handle('updateTripDay', async (event, ...param) => {
    // @ts-ignore
    return await tripDayStore.update(...param);
  });

  ipcMain.handle('findTripDaysByTrip', async (event, param: string) => {
    return tripDayStore.findByTrip(param);
  });

  /*** Event store ***/
  ipcMain.handle('createEvent', async (event, param) => {
    return await eventStore.create(param);
  });

  ipcMain.handle('updateEvent', async (event, ...param) => {
    // @ts-ignore
    return await eventStore.update(...param);
  });

  ipcMain.handle('findEventsByTripDay', async (event, tripDayId: string) => {
    return eventStore.findByTripDay(tripDayId);
  });

  ipcMain.handle('findEventsByCategory', async (event, categoryId: string) => {
    return eventStore.findByCategory(categoryId);
  });
};
