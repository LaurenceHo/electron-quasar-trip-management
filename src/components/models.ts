export interface Base {
  _id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripModel extends Base {
  timezoneId: string;
  startDate: string;
  endDate: string;
  name?: string;
  destination: string;
  archived?: boolean;
  tripDay?: TripDayModel[];
}

export interface TripDayModel extends Base {
  tripId: string;
  name?: string;
  tripDate: string;
  events?: Event[];
}

export interface EventModel extends Base {
  tripDayId: string;
  categoryId: string;
  startTimeTimezoneId?: string;
  endTimeTimezoneId?: string;
  currencyId?: string;
  startTime?: string;
  endTime?: string;
  title: string;
  startLocation?: string;
  endLocation?: string;
  note?: string;
  tags?: string;
  cost?: number;
}

export interface CategoryModel extends Base {
  name: string;
}

export interface CurrencyModel extends Base {
  code: string;
  name: string;
}
