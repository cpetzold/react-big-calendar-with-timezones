import moment from './moment';

export const currentTimezone = moment.tz.guess();
/**
 * We have defined the Scheduler defaultProps here so that it is easier
 * to write unit testing against them for proper function coverage
 */
export const getMoment = (timezone = currentTimezone) => {
  const m = (...args) => moment.tz(...args, timezone);
  m.localeData = moment.localeData;
  return m;
};

export const convertDateTimeToDate = (datetime, tzMoment) => {
  return new Date(tzMoment(datetime).format()); // sets Date using ISO 8601 format
};

export const convertDateToDateTime = (date, timezone) => {
  const m = moment.tz(date, timezone);
  return moment.tz(
    {
      year: m.year(),
      month: m.month(),
      date: m.date(),
      hour: m.hour(),
      minute: m.minute()
    },
    timezone
  );
};

export const getTimeAsDate = (hour, tzMoment) => {
  const m = tzMoment('1970-01-01');
  return new Date(
    m
      .hour(hour)
      .minute(0)
      .format()
  );
};

export const getNow = (now, timezone) => convertDateTimeToDate(now(), timezone);

export const dateRangeHeaderFormat = ({ start, end }, culture, localizer) =>
  `${localizer.format(start, 'ddd, MM/DD/YY', culture)} - ${localizer.format(
    end,
    'ddd, MM/DD/YY',
    culture
  )}`;

export const normalizeDates = (
  events,
  startField = 'start',
  endField = 'end'
) =>
  events.map(event => ({
    ...event,
    [startField]: new Date(event[startField]),
    [endField]: new Date(event[endField])
  }));
