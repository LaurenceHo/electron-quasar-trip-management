import { EventModel, TripDayModel, TripModel } from 'src/types/models';

type Nullable<T> = T | null;

export interface BaseService<T> {
  create(data: T): Promise<T>;

  update(id: string, data: T): Promise<number>;

  delete?(id: string): Promise<number>;

  findOneById(id: string): Promise<T>;
}

export interface TripService extends BaseService<TripModel> {
  findAllTrips(): Promise<TripModel[]>;

  findTripsByStarred(): Promise<TripModel[]>;

  findTripsByArchived(): Promise<TripModel[]>;

  findTripsByTime(param: 'future' | 'current' | 'past'): Promise<TripModel[]>;
}

interface TripDayService extends BaseService<TripDayModel> {
  findTripDaysByTrip(tripId: string): Promise<TripDayModel[]>;
}

interface EventService extends BaseService<EventModel> {
  findEventsByTripDay(tripDayId: string): Promise<EventModel[]>;

  findEventsByCategory(categoryId: string): Promise<EventModel[]>;
}
