import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import BaseStore from './base-store';
import { Event, EventSchema } from './schemas';

export default class EventStore extends BaseStore<Event> {
  validate(data: Event): boolean {
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

    const schemaValidator = ajv.compile(EventSchema);
    return schemaValidator(data);
  }

  findByTripDay(tripDayId: string) {
    return this.databaseInstance.find({ tripDayId }).sort({ order: 1 });
  }

  findByCategory(categoryId: string) {
    return this.databaseInstance.find({ categoryId }).sort({ categoryId: 1 });
  }
}
