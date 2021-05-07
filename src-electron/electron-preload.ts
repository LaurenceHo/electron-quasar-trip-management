/**
 *   Ref: https://www.electronjs.org/docs/api/context-bridge
 */
import { contextBridge, ipcRenderer } from 'electron';
import { Event, Trip, TripDay } from 'src/database/schemas';

contextBridge.exposeInMainWorld('TripService', {
  create: async (data: Trip) => await ipcRenderer.invoke('createTrip', data),
  update: async (tripId: string, data: Trip) => await ipcRenderer.invoke('updateTrip', tripId, data),
  findOneById: async (tripId: string) => await ipcRenderer.invoke('findTripById', tripId),
  findAllTrips: async () => await ipcRenderer.invoke('findAllTrips'),
  findTripsByStarred: async () => await ipcRenderer.invoke('findTripsByStarred'),
  findTripsByArchived: async () => await ipcRenderer.invoke('findTripsByArchived'),
  findTripsByTime: async (param: 'future' | 'current' | 'past') => await ipcRenderer.invoke('findTripsByTime', param),
});

contextBridge.exposeInMainWorld('TripDayService', {
  create: async (data: TripDay) => await ipcRenderer.invoke('createTripDay', data),
  update: async (tripDayId: string, data: TripDay) => await ipcRenderer.invoke('updateTripDay', tripDayId, data),
  delete: async (tripDayId: string) => await ipcRenderer.invoke('deleteTripDay', tripDayId),
  findOneById: async (tripDayId: string) => await ipcRenderer.invoke('findTripDayById', tripDayId),
  findTripDaysByTrip: async (param: string) => await ipcRenderer.invoke('findTripDaysByTrip', param),
});

contextBridge.exposeInMainWorld('EventService', {
  creat: async (data: Event) => await ipcRenderer.invoke('createEvent', data),
  update: async (eventId: string, data: Event) => await ipcRenderer.invoke('updateEvent', eventId, data),
  delete: async (eventId: string) => await ipcRenderer.invoke('deleteEvent', eventId),
  findOneById: async (eventId: string) => await ipcRenderer.invoke('findEventById', eventId),
  findEventsByTripDay: async (param: string) => await ipcRenderer.invoke('findEventsByTripDay', param),
  findEventsByCategory: async (param: string) => await ipcRenderer.invoke('findEventsByCategory', param),
});
