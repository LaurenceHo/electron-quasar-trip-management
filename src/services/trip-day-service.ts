import { DateTime } from 'luxon';
import { TripDaySchema } from '../database/schemas';
import TripDayStore from '../database/trip-day-store';
import { TripDayModel } from '../types/models';
import { TripDayService as ITripDayService } from '../types/type';

const tripDayStore = new TripDayStore('trip_day.db', TripDaySchema);

const dateTimeFormat = (dateTime: string): string => {
  return dateTime ? DateTime.fromISO(dateTime).toLocaleString() : '-';
};

export default class TripDayService implements ITripDayService {
  createTripDay(tripDay: TripDayModel): Promise<TripDayModel> {
    return Promise.resolve({} as any);
  }

  updateTripDay(tripDayId: string, tripDay: TripDayModel): Promise<number> {
    return Promise.resolve(0);
  }

  deleteTripDay(tripDayId: string): Promise<number> {
    return Promise.resolve(0);
  }

  findTripDaysByTrip(tripId: string): Promise<TripDayModel[]> {
    return Promise.resolve([]);
  }
}
