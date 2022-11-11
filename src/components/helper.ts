import { DateTime } from 'luxon';

export const localDateTimeFormat = (dateTime: string): string => dateTime ? DateTime.fromISO(dateTime).toLocaleString() : '--';
