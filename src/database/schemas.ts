import { JSONSchemaType } from 'ajv';

/** Ref: https://ajv.js.org/guide/typescript.html **/

export interface Base {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Trip extends Base {
  timezoneId: string;
  startDate: Date;
  endDate: Date;
  name?: string;
  destination: string;
  archived?: boolean;
  starred?: boolean;
}

export interface TripDay extends Base {
  tripId: string;
  name?: string;
  tripDate: Date;
}

export interface Event extends Base {
  tripDayId: string;
  categoryId: string;
  startTimeTimezoneId?: string;
  endTimeTimezoneId?: string;
  currencyId?: string;
  startTime?: Date;
  endTime?: Date;
  title: string;
  startLocation?: string;
  endLocation?: string;
  note?: string;
  tags?: string;
  cost?: number;
  order: number;
}

export interface Category {
  name: string;
}

export const TripSchema: JSONSchemaType<Trip> = {
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    createdAt: { type: 'object', format: 'custom-date-time', nullable: true, required: [] },
    updatedAt: { type: 'object', format: 'custom-date-time', nullable: true, required: [] },
    timezoneId: { type: 'string' },
    startDate: { type: 'object', format: 'custom-date-time', required: [] },
    endDate: { type: 'object', format: 'custom-date-time', required: [] },
    name: { type: 'string', nullable: true },
    destination: { type: 'string' },
    archived: { type: 'boolean', nullable: true },
    starred: { type: 'boolean', nullable: true },
  },
  required: ['timezoneId', 'startDate', 'endDate', 'destination'],
  additionalProperties: false,
};

export const TripDaySchema: JSONSchemaType<TripDay> = {
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    createdAt: { type: 'object', format: 'custom-date-time', nullable: true, required: [] },
    updatedAt: { type: 'object', format: 'custom-date-time', nullable: true, required: [] },
    tripId: { type: 'string' },
    name: { type: 'string', nullable: true },
    tripDate: { type: 'object', format: 'custom-date-time', required: [] },
  },
  required: ['tripId', 'tripDate'],
  additionalProperties: false,
};

export const EventSchema: JSONSchemaType<Event> = {
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    createdAt: { type: 'object', format: 'custom-date-time', nullable: true, required: [] },
    updatedAt: { type: 'object', format: 'custom-date-time', nullable: true, required: [] },
    tripDayId: { type: 'string' },
    categoryId: { type: 'string' },
    startTimeTimezoneId: { type: 'string', nullable: true },
    endTimeTimezoneId: { type: 'string', nullable: true },
    currencyId: { type: 'string', nullable: true },
    startTime: { type: 'object', format: 'custom-date-time', required: [], nullable: true },
    endTime: { type: 'object', format: 'custom-date-time', required: [], nullable: true },
    title: { type: 'string' },
    startLocation: { type: 'string', nullable: true },
    endLocation: { type: 'string', nullable: true },
    note: { type: 'string', nullable: true },
    tags: { type: 'string', nullable: true },
    cost: { type: 'number', nullable: true },
    order: { type: 'number' },
  },
  required: ['tripDayId', 'categoryId', 'title', 'order'],
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
