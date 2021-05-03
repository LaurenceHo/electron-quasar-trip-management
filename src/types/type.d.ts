import { EventModel, TripDayModel, TripModel } from 'src/types/models';

type Nullable<T> = T | null;

export interface TripService {
  createTrip(trip: TripModel): Promise<TripModel>;

  updateTrip(tripId: string, trip: TripModel): Promise<number>;

  findAllTrips(): Promise<TripModel[]>;

  findTripsByStarred(): Promise<TripModel[]>;

  findTripsByArchived(): Promise<TripModel[]>;

  findTripsByTime(param: 'future' | 'current' | 'past'): Promise<TripModel[]>;
}

interface TripDayService {
  createTripDay(tripDay: TripDayModel): Promise<TripDayModel>;

  updateTripDay(tripDayId: string, tripDay: TripDayModel): Promise<number>;

  deleteTripDay(tripDayId: string): Promise<number>;

  findTripDaysByTrip(tripId: string): Promise<TripDayModel[]>;
}

interface EventService {
  createEvent(event: EventModel): Promise<EventModel>;

  updateEvent(eventId: string, event: EventModel): Promise<number>;

  deleteEvent(eventId: string): Promise<number>;

  findEventsByTripDay(tripDayId: string): Promise<EventModel[]>;

  findEventsByCategory(categoryId: string): Promise<EventModel[]>;
}
