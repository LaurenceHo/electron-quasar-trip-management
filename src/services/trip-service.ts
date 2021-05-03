import { DateTime } from 'luxon';
import { Trip, TripSchema } from '../database/schemas';
import TripStore from '../database/trip-store';
import { TripModel } from '../types/models';
import { TripService as ITripService } from '../types/type';

const tripStore = new TripStore('trip.db', TripSchema);

const dateTimeFormat = (dateTime: string): string => {
  return dateTime ? DateTime.fromISO(dateTime).toLocaleString() : '-';
};

const parseTripModel = (item: TripModel): Trip => {
  const trip: Trip = { destination: '', endDate: new Date(), startDate: new Date(), timezoneId: '' };
  trip.timezoneId = item.timezoneId;
  trip.startDate = new Date(item.startDate);
  trip.endDate = new Date(item.endDate);
  trip.destination = item.destination;
  trip.name = item.name;
  trip.archived = item.archived;
  trip.starred = item.starred;
  return trip;
};
const parseTrip = (item: Trip): TripModel => {
  const tripModel: TripModel = {
    destination: '',
    endDate: '',
    startDate: '',
    timezoneId: '',
  };
  tripModel._id = item._id;
  tripModel.name = item.name;
  tripModel.destination = item.destination;
  tripModel.startDate = dateTimeFormat(item.startDate.toISOString());
  tripModel.endDate = dateTimeFormat(item.endDate.toISOString());
  tripModel.archived = item.archived;
  tripModel.starred = item.starred;
  tripModel.timezoneId = item.timezoneId;
  tripModel.tripDay = [];
  return tripModel;
};

export default class TripService implements ITripService {
  async createTrip(item: TripModel): Promise<TripModel> {
    const trip = parseTripModel(item);
    const newTrip = (await tripStore.create(trip)) as Trip;
    return parseTrip(newTrip);
  }

  async updateTrip(_id: string, item: TripModel): Promise<number> {
    const trip = parseTripModel(item);
    return (await tripStore.update(_id, trip)) as number;
  }

  async findAllTrips(): Promise<TripModel[]> {
    let trips = (await tripStore.findAll()) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }

  async findTripsByStarred(): Promise<TripModel[]> {
    let trips = (await tripStore.findByStarred()) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }

  async findTripsByArchived(): Promise<TripModel[]> {
    let trips = (await tripStore.findByArchived()) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }

  async findTripsByTime(keyword: 'future' | 'current' | 'past'): Promise<TripModel[]> {
    let trips = (await tripStore.findByTime(keyword)) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }
}
