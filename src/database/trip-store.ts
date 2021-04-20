import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import BaseStore from './base-store';
import { Trip, TripSchema } from './schemas';

export default class TripStore extends BaseStore<Trip> {
  validate(data: Trip): boolean {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });
    addFormats(ajv);
    ajv.addFormat('custom-date-time', (dateTimeString: any) => {
      if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
      }
      return !isNaN(Date.parse(dateTimeString));
    });
    const schemaValidator = ajv.compile(TripSchema);
    return schemaValidator(data);
  }

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
    return this.databaseInstance.find({ starred: true });
  }

  findByArchived() {
    return this.databaseInstance.find({ archived: true });
  }

  findAll() {
    return this.databaseInstance.find({}).sort({ startDate: -1 });
  }
}
