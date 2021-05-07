import EventStore from '../database/event-store';
import { EventSchema } from '../database/schemas';
import { EventModel } from '../types/models';
import { EventService as IEventService } from '../types/type';

const eventStore = new EventStore('event.db', EventSchema);

// TODO
export default class EventService implements IEventService {
  async create(event: EventModel): Promise<EventModel> {
    return Promise.resolve({} as any);
  }

  async update(eventId: string, event: EventModel): Promise<number> {
    return Promise.resolve(0);
  }

  async delete(eventId: string): Promise<number> {
    return Promise.resolve(0);
  }

  async findOneById(eventId: string): Promise<EventModel> {
    return Promise.resolve({} as EventModel);
  }

  async findEventsByCategory(categoryId: string): Promise<EventModel[]> {
    return Promise.resolve([]);
  }

  async findEventsByTripDay(tripDayId: string): Promise<EventModel[]> {
    return Promise.resolve([]);
  }
}
