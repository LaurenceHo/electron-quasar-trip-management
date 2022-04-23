import { DateTime } from 'luxon';

export const localDateTimeFormat = (dateTime: string): string => {
  return dateTime ? DateTime.fromISO(dateTime).toLocaleString() : '--';
};
