import { JSONSchemaType } from 'ajv';
import { CategoryModel, CurrencyModel } from 'components/models';

/** Ref: https://ajv.js.org/guide/typescript.html **/

export interface Trip {
  timezone_id: string;
  start_date: Date;
  end_date: string;
  name?: string;
  destination: string;
  archived?: boolean;
  starred?: boolean;
}

export interface TripDay {
  trip_id: string;
  name?: string;
  trip_date: string;
}

export interface Event {
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

export interface Category {
  name: string;
}

export interface Currency {
  code: string;
  name: string;
}

export const TripSchema: JSONSchemaType<Trip> = {
  type: 'object',
  properties: {
    timezone_id: { type: 'string' },
    start_date: { type: 'object', format: 'date-time', additionalProperties: false, required: [] },
    end_date: { type: 'string' },
    name: { type: 'string', nullable: true },
    destination: { type: 'string' },
    archived: { type: 'boolean', nullable: true },
    starred: { type: 'boolean', nullable: true },
  },
  required: ['timezone_id', 'start_date', 'end_date', 'destination'],
  additionalProperties: false,
};

export const TripDaySchema: JSONSchemaType<TripDay> = {
  type: 'object',
  properties: {
    trip_id: { type: 'string' },
    name: { type: 'string', nullable: true },
    trip_date: { type: 'string', format: 'date' },
  },
  required: ['trip_id', 'trip_date'],
  additionalProperties: false,
};

export const EventSchema: JSONSchemaType<Event> = {
  type: 'object',
  properties: {
    trip_day_id: { type: 'string' },
    category_id: { type: 'string' },
    start_time_timezone_id: { type: 'string', nullable: true },
    end_time_timezone_id: { type: 'string', nullable: true },
    currency_id: { type: 'string', nullable: true },
    start_time: { type: 'string', format: 'date-time', nullable: true },
    end_time: { type: 'string', format: 'date-time', nullable: true },
    title: { type: 'string' },
    start_location: { type: 'string', nullable: true },
    end_location: { type: 'string', nullable: true },
    note: { type: 'string', nullable: true },
    tags: { type: 'string', nullable: true },
    cost: { type: 'number', nullable: true },
  },
  required: ['trip_day_id', 'category_id', 'title'],
  additionalProperties: false,
};

export const CurrencySchema: JSONSchemaType<Currency> = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['code', 'name'],
  additionalProperties: false,
};

export const CategorySchema: JSONSchemaType<Category> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
  additionalProperties: false,
};
