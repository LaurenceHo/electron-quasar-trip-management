import Ajv from 'ajv';
import Datastore from 'nedb-promises';
import { Trip, TripSchema } from './schemas';

export default class TripStore {
  dbPath = './src/database/trip.db';
  db = Datastore.create({
    filename: this.dbPath,
    timestampData: true,
    autoload: true
  });

  validate(data: Trip): boolean {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });
    const schemaValidator = ajv.compile(TripSchema);
    return schemaValidator(data);
  }

  create(data: Trip) {
    const isValid = this.validate(data);
    if (isValid) {
      return this.db.insert(data);
    }
  }

  findOneById(_id: number) {
    return this.db.findOne({ _id });
  }

  findByTime(keyword: 'future' | 'current' | 'past') {
    if (keyword === 'future') {
      return this.db.find({ start_date: { $gt: new Date() } });
    } else if (keyword === 'current') {
      return this.db.find({ $and: [{ start_date: { $lte: new Date() } }, { end_date: { $gte: new Date() } }] });
    } else if (keyword === 'past') {
      return this.db.find({ end_date: { $lt: new Date() } });
    } else {
      return this.db.find({});
    }
  }

  findStarred() {
    return this.db.find({ starred: true });
  }

  findArchived() {
    return this.db.find({ archived: true });
  }

  findAll(): any {
    return this.db.find({});
  }
}
