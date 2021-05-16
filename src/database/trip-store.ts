import BaseStore from './base-store';
import { Trip } from './schemas';

export default class TripStore extends BaseStore<Trip> {
  findByTime(keyword: 'future' | 'current' | 'past') {
    if (keyword === 'future') {
      return this.databaseInstance.find({ startDate: { $gt: new Date() } });
    } else if (keyword === 'current') {
      return this.databaseInstance.find({
        $and: [{ startDate: { $lte: new Date() } }, { endDate: { $gte: new Date() } }],
      });
    } else if (keyword === 'past') {
      return this.databaseInstance.find({ endDate: { $lt: new Date() } });
    } else {
      return this.databaseInstance.find({});
    }
  }

  findByStarred() {
    return this.databaseInstance.find({ starred: true }).sort({ startDate: -1 });
  }

  findByArchived() {
    return this.databaseInstance.find({ archived: true }).sort({ startDate: -1 });
  }

  findAll() {
    return this.databaseInstance
      .find({ $and: [{ startDate: { $ne: null } }, { endDate: { $ne: null } }] })
      .sort({ startDate: -1 });
  }
}
