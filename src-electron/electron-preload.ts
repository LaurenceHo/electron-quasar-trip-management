/**
 *   Ref: https://www.electronjs.org/docs/api/context-bridge
 */
import { contextBridge, ipcRenderer } from 'electron';
import { Event, Trip, TripDay } from 'src/database/schemas';

contextBridge.exposeInMainWorld('TripService', {
  createTrip: async (data: Trip) => await ipcRenderer.invoke('createTrip', data),
  updateTrip: async (tripId: string, data: Trip) => await ipcRenderer.invoke('updateTrip', tripId, data),
  findAllTrips: async () => await ipcRenderer.invoke('findAllTrips'),
  findTripsByStarred: async () => await ipcRenderer.invoke('findTripsByStarred'),
  findTripsByArchived: async () => await ipcRenderer.invoke('findTripsByArchived'),
  findTripsByTime: async (param: 'future' | 'current' | 'past') => await ipcRenderer.invoke('findTripsByTime', param),
});

contextBridge.exposeInMainWorld('TripDayService', {
  createTripDay: async (data: TripDay) => await ipcRenderer.invoke('createTripDay', data),
  updateTripDay: async (tripDayId: string, data: TripDay) => await ipcRenderer.invoke('updateTripDay', tripDayId, data),
  deleteTripDay: async (tripDayId: string) => await ipcRenderer.invoke('deleteTripDay', tripDayId),
  findTripDaysByTrip: async (param: string) => await ipcRenderer.invoke('findTripDaysByTrip', param),
});

contextBridge.exposeInMainWorld('EventService', {
  creatEvent: async (data: Event) => await ipcRenderer.invoke('createEvent', data),
  updateEvent: async (eventId: string, data: Event) => await ipcRenderer.invoke('updateEvent', eventId, data),
  deleteEvent: async (eventId: string) => await ipcRenderer.invoke('deleteEvent', eventId),
  findEventsByTripDay: async (param: string) => await ipcRenderer.invoke('findEventsByTripDay', param),
  findEventsByCategory: async (param: string) => await ipcRenderer.invoke('findEventsByCategory', param),
});
