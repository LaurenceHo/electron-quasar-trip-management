export interface TripModel {
  _id?: string;
  timezone_id: string;
  start_date: string;
  end_date: string;
  name?: string;
  destination: string;
  archived?: boolean;
  trip_day?: TripDayModel[];
}

export interface TripDayModel {
  _id?: string;
  trip_id: string;
  name?: string;
  trip_date: string;
  events?: Event[];
}

export interface EventModel {
  _id?: string;
  trip_day_id: string;
  category_id: string;
  start_time_timezone_id?: string;
  end_time_timezone_id?: string;
  currency_id?: string;
  start_time?: string;
  end_time?: string;
  title: string;
  start_location?: string;
  end_location?: string;
  note?: string;
  tags?: string;
  cost?: number;
}

export interface CategoryModel {
  _id: string;
  name: string;
}

export interface CurrencyModel {
  _id: string;
  code: string;
  name: string;
}
