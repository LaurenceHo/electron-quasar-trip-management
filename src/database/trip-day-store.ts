import BaseStore from './base-store';
import { TripDay } from './schemas';

export default class TripDayStore extends BaseStore<TripDay> {
  findByTrip(tripId: string) {
    return this.databaseInstance.find({ tripId }).sort({ tripDate: -1 });
  }
}
