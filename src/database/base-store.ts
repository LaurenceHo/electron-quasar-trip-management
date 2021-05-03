import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import Datastore from 'nedb-promises';
import { Event, Trip, TripDay } from 'src/database/schemas';

export default class BaseStore<T extends Trip | TripDay | Event> {
  filePath = '';
  databaseInstance;
  schema;

  constructor(fileName: string, schema: JSONSchemaType<T>) {
    // TODO, shouldn't use this file path in packaged app
    this.filePath = `./src/database/${fileName}`;
    this.databaseInstance = Datastore.create({
      filename: this.filePath,
      timestampData: true,
      autoload: true,
    });
    this.schema = schema;
  }

  validate(data: T): boolean {
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
    const schemaValidator = ajv.compile(this.schema);
    return schemaValidator(data);
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
