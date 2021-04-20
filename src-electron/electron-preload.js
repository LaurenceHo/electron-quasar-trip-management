/**
 *   Ref: https://www.electronjs.org/docs/api/context-bridge
 */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('tripApi', {
  createTrip: async (data) => await ipcRenderer.invoke('createTrip', data),
  updateTrip: async (_id, data) => await ipcRenderer.invoke('updateTrip', _id, data),
  findAllTrips: async () => await ipcRenderer.invoke('findAllTrips'),
  findTripsByStarred: async (param) => await ipcRenderer.invoke('findTripsByStarred', param),
  findTripsByArchived: async (param) => await ipcRenderer.invoke('findTripsByArchived', param),
  findTripsByTime: async (param) => await ipcRenderer.invoke('findTripsByTime', param),
});

contextBridge.exposeInMainWorld('tripDayApi', {
  createTripDay: async (data) => await ipcRenderer.invoke('createTripDay', data),
  updateTripDay: async (_id, data) => await ipcRenderer.invoke('updateTripDay', _id, data),
  findTripDaysByTrip: async (param) => await ipcRenderer.invoke('findTripDaysByTrip', param),
});

contextBridge.exposeInMainWorld('eventApi', {
  creatEvent: async (data) => await ipcRenderer.invoke('createEvent', data),
  updateEvent: async (_id, data) => await ipcRenderer.invoke('updateEvent', _id, data),
  findEventsByTripDay: async (param) => await ipcRenderer.invoke('findEventsByTripDay', param),
  findEventsByCategory: async (param) => await ipcRenderer.invoke('findEventsByCategory', param),
});
