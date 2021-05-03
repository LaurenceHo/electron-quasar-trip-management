import electron from 'electron';
import EventService from '../src/services/event-service';
import TripDayService from '../src/services/trip-day-service';
import TripService from '../src/services/trip-service';
import { TripDayModel, TripModel } from '../src/types/models';

export const enableIPC = () => {
  const ipcMain = electron.ipcMain;
  const tripService = new TripService();
  const tripDayService = new TripDayService();
  const eventService = new EventService();

  /*** Trip store ***/
  ipcMain.handle('createTrip', async (event, param: TripModel) => {
    return await tripService.createTrip(param);
  });

  ipcMain.handle('updateTrip', async (event, ...param) => {
    // @ts-ignore
    return await tripService.updateTrip(...param);
  });

  ipcMain.handle('findAllTrips', async () => {
    return await tripService.findAllTrips();
  });

  ipcMain.handle('findTripsByStarred', async () => {
    return await tripService.findTripsByStarred();
  });

  ipcMain.handle('findTripsByArchived', async () => {
    return await tripService.findTripsByArchived();
  });

  ipcMain.handle('findTripsByTime', async (event, param: 'future' | 'current' | 'past') => {
    return await tripService.findTripsByTime(param);
  });

  /*** TripDay store ***/
  ipcMain.handle('createTripDay', async (event, param: TripDayModel) => {
    return await tripDayService.createTripDay(param);
  });

  ipcMain.handle('updateTripDay', async (event, ...param) => {
    // @ts-ignore
    return await tripDayService.updateTripDay(...param);
  });

  ipcMain.handle('deleteTripDay', async (event, tripDayId: string) => {
    return await tripDayService.deleteTripDay(tripDayId);
  });

  ipcMain.handle('findTripDaysByTrip', async (event, tripId: string) => {
    return await tripDayService.findTripDaysByTrip(tripId);
  });

  /*** Event store ***/
  ipcMain.handle('createEvent', async (event, param) => {
    return await eventService.createEvent(param);
  });

  ipcMain.handle('updateEvent', async (event, ...param) => {
    // @ts-ignore
    return await eventService.updateEvent(...param);
  });

  ipcMain.handle('deleteEvent', async (event, eventId: string) => {
    return await eventService.deleteEvent(eventId);
  });

  ipcMain.handle('findEventsByTripDay', async (event, tripDayId: string) => {
    return await eventService.findEventsByTripDay(tripDayId);
  });

  ipcMain.handle('findEventsByCategory', async (event, categoryId: string) => {
    return await eventService.findEventsByCategory(categoryId);
  });
};
