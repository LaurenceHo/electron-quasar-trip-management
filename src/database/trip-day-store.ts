import BaseStore from './base-store';
import { TripDay } from './schemas';

export default class TripDayStore extends BaseStore<TripDay> {
  findByTrip(tripId: string) {
    return this.databaseInstance.find({ tripId }).sort({ tripDate: -1 });
  }

  deleteTripDay(_id: string) {
    // options set to {} since the default for multi is false
    return this.databaseInstance.remove({ _id }, {});
  }
}
