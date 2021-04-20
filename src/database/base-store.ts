import Datastore from 'nedb-promises';
import { Event, Trip, TripDay } from 'src/database/schemas';

export default class BaseStore<T extends Trip | TripDay | Event> {
  filePath = '';
  databaseInstance;

  constructor(fileName: string) {
    // TODO, shouldn't use this file path in packaged app
    this.filePath = `./src/database/${fileName}`;
    this.databaseInstance = Datastore.create({
      filename: this.filePath,
      timestampData: true,
      autoload: true,
    });
  }

  validate(data: T): boolean {
    return false;
  }

  create(data: T) {
    const isValid = this.validate(data);
    if (isValid) {
      return this.databaseInstance.insert(data);
    }
  }

  update(_id: string, data: T) {
    const isValid = this.validate(data);
    if (isValid) {
      return this.databaseInstance.update({ _id }, data);
    }
  }

  findOneById(_id: string) {
    return this.databaseInstance.findOne({ _id });
  }
}
