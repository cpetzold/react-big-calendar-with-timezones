import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Timezones from './components/Timezones.component';
import Scheduler from './components/Scheduler.component';
import {currentTimezone} from './utils/dateUtils';
import { events } from './eventData';

import './styles.css';

const App = () => {
  const [timezone, setTimezone] = useState(currentTimezone);
  const now = () => new Date(2019, 1, 12);
  return (
    <div className="App">
      <div className="control-container">
        <Timezones
          className="control"
          value={timezone}
          onChange={val => setTimezone(val)}
        />
      </div>
      <Scheduler timezone={timezone} now={now} events={events} />
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
