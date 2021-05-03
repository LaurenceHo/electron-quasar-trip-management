/**
 *   Ref: https://www.electronjs.org/docs/api/context-bridge
 */
import { contextBridge, ipcRenderer } from 'electron';
import { Event, Trip, TripDay } from 'src/database/schemas';

contextBridge.exposeInMainWorld('tripApi', {
  createTrip: async (data: Trip) => await ipcRenderer.invoke('createTrip', data),
  updateTrip: async (_id: string, data: Trip) => await ipcRenderer.invoke('updateTrip', _id, data),
  findAllTrips: async () => await ipcRenderer.invoke('findAllTrips'),
  findTripsByStarred: async () => await ipcRenderer.invoke('findTripsByStarred'),
  findTripsByArchived: async () => await ipcRenderer.invoke('findTripsByArchived'),
  findTripsByTime: async (param: 'future' | 'current' | 'past') => await ipcRenderer.invoke('findTripsByTime', param),
});

contextBridge.exposeInMainWorld('tripDayApi', {
  createTripDay: async (data: TripDay) => await ipcRenderer.invoke('createTripDay', data),
  updateTripDay: async (_id: string, data: TripDay) => await ipcRenderer.invoke('updateTripDay', _id, data),
  findTripDaysByTrip: async (param: string) => await ipcRenderer.invoke('findTripDaysByTrip', param),
});

contextBridge.exposeInMainWorld('eventApi', {
  creatEvent: async (data: Event) => await ipcRenderer.invoke('createEvent', data),
  updateEvent: async (_id: string, data: Event) => await ipcRenderer.invoke('updateEvent', _id, data),
  findEventsByTripDay: async (param: string) => await ipcRenderer.invoke('findEventsByTripDay', param),
  findEventsByCategory: async (param: string) => await ipcRenderer.invoke('findEventsByCategory', param),
});
