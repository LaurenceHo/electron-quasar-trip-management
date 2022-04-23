import * as electron from 'electron';
import EventService from '../src/services/event-service';
import TripDayService from '../src/services/trip-day-service';
import TripService from '../src/services/trip-service';
import { EventModel, TripDayModel, TripModel } from '../src/types/models';

export const enableIPC = () => {
  const ipcMain = electron.ipcMain;
  const tripService = new TripService();
  const tripDayService = new TripDayService();
  const eventService = new EventService();

  /*** Trip store ***/
  ipcMain.handle('createTrip', async (event, param: TripModel) => {
    return await tripService.create(param);
  });

  ipcMain.handle('updateTrip', async (event, tripId: string, tripModel: TripModel) => {
    return await tripService.update(tripId, tripModel);
  });

  ipcMain.handle('findTripById', async (event, tripId: string) => {
    return await tripService.findOneById(tripId);
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
    return await tripDayService.create(param);
  });

  ipcMain.handle('updateTripDay', async (event, tripDayId: string, param: TripDayModel) => {
    return await tripDayService.update(tripDayId, param);
  });

  ipcMain.handle('deleteTripDay', async (event, tripDayId: string) => {
    return await tripDayService.delete(tripDayId);
  });

  ipcMain.handle('findTripDayById', async (event, tripDayId: string) => {
    return await tripDayService.findOneById(tripDayId);
  });

  ipcMain.handle('findTripDaysByTrip', async (event, tripId: string) => {
    return await tripDayService.findTripDaysByTrip(tripId);
  });

  /*** Event store ***/
  ipcMain.handle('createEvent', async (event, param) => {
    return await eventService.create(param);
  });

  ipcMain.handle('updateEvent', async (event, eventId: string, param: EventModel) => {
    return await eventService.update(eventId, param);
  });

  ipcMain.handle('deleteEvent', async (event, eventId: string) => {
    return await eventService.delete(eventId);
  });

  ipcMain.handle('findEventById', async (event, eventId: string) => {
    return await eventService.findOneById(eventId);
  });

  ipcMain.handle('findEventsByTripDay', async (event, tripDayId: string) => {
    return await eventService.findEventsByTripDay(tripDayId);
  });

  ipcMain.handle('findEventsByCategory', async (event, categoryId: string) => {
    return await eventService.findEventsByCategory(categoryId);
  });
};
