import React, { useState } from 'react';
import {
  Calendar as Component,
  momentLocalizer,
  Views
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import {
  currentTimezone,
  getMoment,
  dateRangeHeaderFormat,
  getNow,
  getTimeAsDate
} from '../utils/dateUtils';
// this converts my date strings to JS Date objects (local time)
import useNormalizedDates from './useNormalizedDates.hook';

let formats = {
  dateFormat: 'DD',
  dayFormat: 'ddd MM/DD/YYYY',
  monthHeaderFormat: 'MMMM, YYYY',
  dayRangeHeaderFormat: dateRangeHeaderFormat,
  dayHeaderFormat: 'dddd, MMMM DD, YYYY'
};

const Calendar = withDragAndDrop(Component);
const views = [Views.DAY, Views.WEEK, Views.MONTH];

const Scheduler = ({
  timezone = currentTimezone,
  now,
  events = [],
  ...props
}) => {
  const [calEvents, setCalEvents] = useState([]);
  useNormalizedDates(events, setCalEvents);

  const moment = getMoment(timezone);
  const localizer = momentLocalizer(moment);
  return (
    <div className="scheduler-container">
      <Calendar
        localizer={localizer}
        formats={formats}
        events={calEvents}
        views={views}
        defaultView={Views.WEEK}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="patient"
        getNow={() => getNow(now, moment)}
        min={getTimeAsDate(7, moment)}
        max={getTimeAsDate(18, moment)}
      />
    </div>
  );
};

export default Scheduler;
