import { TripModel, TripDayModel, EventModel } from 'src/types/models';

type Nullable<T> = T | null;

export interface TripApi {
  createTrip(trip: TripModel): Promise<void>;
  updateTrip(tripId: string, trip: TripModel): Promise<void>;
  findAllTrips(): Promise<TripModel[]>;
  findTripsByStarred(): Promise<TripModel[]>;
  findTripsByArchived(): Promise<TripModel[]>;
  findTripsByTime(param: 'future' | 'current' | 'past'): Promise<TripModel[]>;
}
interface TripDayApi {
  createTripDay(tripDay: TripDayModel): Promise<void>;
  updateTripDay(tripDayId: string, tripDay: TripDayModel): Promise<void>;
  findTripDaysByTrip(tripId: string): Promise<TripDayModel[]>;
}
interface EventApi {
  createEvent(event: EventModel): Promise<void>;
  updateEvent(eventId: string, event: EventModel): Promise<void>;
  findEventsByTripDay(tripDayId: string): Promise<EventModel[]>;
  findEventsByCategory(categoryId: string): Promise<EventModel[]>;
}

declare interface Window {
  tripApi: TripApi;
  tripDayApi: TripDayApi;
  eventApi: EventApi;
}
