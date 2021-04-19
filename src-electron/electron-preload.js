/**
 *   Ref: https://www.electronjs.org/docs/api/context-bridge
 */
import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('tripApi', {
  createTrip: async (data) => await ipcRenderer.invoke('createTrip', data),
  findAllTrips: async () => await ipcRenderer.invoke('findAllTrips'),
});
