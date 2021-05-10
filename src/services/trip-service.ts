import { Trip, TripSchema } from '../database/schemas';
import TripStore from '../database/trip-store';
import { TripModel } from '../types/models';
import { TripService as ITripService } from '../types/type';

const tripStore = new TripStore('trip.db', TripSchema);

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
  tripModel.startDate = item.startDate.toISOString();
  tripModel.endDate = item.endDate.toISOString();
  tripModel.archived = item.archived;
  tripModel.starred = item.starred;
  tripModel.timezoneId = item.timezoneId;
  return tripModel;
};

export default class TripService implements ITripService {
  async create(item: TripModel): Promise<TripModel> {
    const trip = parseTripModel(item);
    const newTrip = (await tripStore.create(trip)) as Trip;
    return parseTrip(newTrip);
  }

  async update(tripId: string, item: TripModel): Promise<number> {
    const trip = parseTripModel(item);
    return (await tripStore.update(tripId, trip)) as number;
  }

  async findOneById(id: string): Promise<TripModel> {
    const trip = (await tripStore.findOneById(id)) as Trip;
    return parseTrip(trip);
  }

  async findAllTrips(): Promise<TripModel[]> {
    const trips = (await tripStore.findAll()) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }

  async findTripsByStarred(): Promise<TripModel[]> {
    const trips = (await tripStore.findByStarred()) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }

  async findTripsByArchived(): Promise<TripModel[]> {
    const trips = (await tripStore.findByArchived()) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }

  async findTripsByTime(keyword: 'future' | 'current' | 'past'): Promise<TripModel[]> {
    const trips = (await tripStore.findByTime(keyword)) as Trip[];
    return trips.map((trip) => parseTrip(trip));
  }
}
