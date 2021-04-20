import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import BaseStore from './base-store';
import { TripDay, TripDaySchema } from './schemas';

export default class TripDayStore extends BaseStore<TripDay> {
  validate(data: TripDay): boolean {
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

    const schemaValidator = ajv.compile(TripDaySchema);
    return schemaValidator(data);
  }

  findByTrip(tripId: string) {
    return this.databaseInstance.find({ tripId }).sort({ tripDate: -1 });
  }
}
