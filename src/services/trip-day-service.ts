import { DateTime } from 'luxon';
import { TripDaySchema } from '../database/schemas';
import TripDayStore from '../database/trip-day-store';
import { TripDayModel } from '../types/models';
import { TripDayService as ITripDayService } from '../types/type';

const tripDayStore = new TripDayStore('trip_day.db', TripDaySchema);

const dateTimeFormat = (dateTime: string): string => {
  return dateTime ? DateTime.fromISO(dateTime).toLocaleString() : '-';
};

// TODO
export default class TripDayService implements ITripDayService {
  create(tripDay: TripDayModel): Promise<TripDayModel> {
    return Promise.resolve({} as any);
  }

  update(tripDayId: string, tripDay: TripDayModel): Promise<number> {
    return Promise.resolve(0);
  }

  delete(tripDayId: string): Promise<number> {
    return Promise.resolve(0);
  }

  findOneById(tripId: string): Promise<TripDayModel> {
    return Promise.resolve({} as TripDayModel);
  }

  findTripDaysByTrip(tripId: string): Promise<TripDayModel[]> {
    return Promise.resolve([]);
  }
}
