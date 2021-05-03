import EventStore from '../database/event-store';
import { EventSchema } from '../database/schemas';
import { EventModel } from '../types/models';
import { EventService as IEventService } from '../types/type';

const eventStore = new EventStore('event.db', EventSchema);

export default class EventService implements IEventService {
  createEvent(event: EventModel): Promise<EventModel> {
    return Promise.resolve({} as any);
  }

  updateEvent(eventId: string, event: EventModel): Promise<number> {
    return Promise.resolve(0);
  }

  deleteEvent(eventId: string): Promise<number> {
    return Promise.resolve(0);
  }

  findEventsByCategory(categoryId: string): Promise<EventModel[]> {
    return Promise.resolve([]);
  }

  findEventsByTripDay(tripDayId: string): Promise<EventModel[]> {
    return Promise.resolve([]);
  }
}
