import { TripDay, TripDaySchema } from '../database/schemas';
import TripDayStore from '../database/trip-day-store';
import { TripDayModel } from '../types/models';
import { TripDayService as ITripDayService } from '../types/type';

const tripDayStore = new TripDayStore('trip_day.db', TripDaySchema);

const parseTripDayModel = (tripDayModel: TripDayModel): TripDay => {
  const tripDay: TripDay = { tripId: '', tripDate: new Date() };
  tripDay.tripId = tripDayModel.tripId;
  tripDay.name = tripDayModel.name;
  tripDay.tripDate = new Date(tripDayModel.tripDate);
  return tripDay;
};

const parseTripDay = (tripDay: TripDay): TripDayModel => {
  const tripDayModel: TripDayModel = { tripDate: '', tripId: '' };
  tripDayModel._id = tripDay._id;
  tripDayModel.tripId = tripDay.tripId;
  tripDayModel.name = tripDay.name;
  tripDayModel.tripDate = tripDay.tripDate.toISOString();
  return tripDayModel;
};

export default class TripDayService implements ITripDayService {
  async create(item: TripDayModel): Promise<TripDayModel> {
    const tripDay = parseTripDayModel(item);
    const newTripDay = (await tripDayStore.create(tripDay)) as TripDay;
    return parseTripDay(newTripDay);
  }

  async update(tripDayId: string, item: TripDayModel): Promise<number> {
    const tripDay = parseTripDayModel(item);
    return (await tripDayStore.update(tripDayId, tripDay)) as number;
  }

  async delete(tripDayId: string): Promise<number> {
    return (await tripDayStore.deleteTripDay(tripDayId)) as number;
  }

  async findOneById(tripId: string): Promise<TripDayModel> {
    const tripDay = (await tripDayStore.findOneById(tripId)) as TripDay;
    return parseTripDay(tripDay);
  }

  async findTripDaysByTrip(tripId: string): Promise<TripDayModel[]> {
    const tripDays = (await tripDayStore.findByTrip(tripId)) as TripDay[];
    return tripDays.map((tripDay) => parseTripDay(tripDay));
  }
}
