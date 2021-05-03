import BaseStore from './base-store';
import { Event } from './schemas';

export default class EventStore extends BaseStore<Event> {
  findByTripDay(tripDayId: string) {
    return this.databaseInstance.find({ tripDayId }).sort({ order: 1 });
  }

  findByCategory(categoryId: string) {
    return this.databaseInstance.find({ categoryId }).sort({ categoryId: 1 });
  }
}
