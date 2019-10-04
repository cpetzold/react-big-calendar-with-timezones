import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import moment from '../utils/moment';
import './Scheduler.styles.scss';

const removeUnderscore = function(str = '') {
  return str.replace(/[\_]/gi, ' ');
};

const timezones = moment.tz.names().map((label, index) => ({
  label: removeUnderscore(label),
  index: index,
  value: label
}));

const Timezones = ({ value, onChange, ...props }) => {
  return (
    <FormGroup controlId="timzones" {...props}>
      <ControlLabel>Timezone</ControlLabel>
      <FormControl
        componentClass="select"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}>
        <option value="" />
        {timezones.map(tz => (
          <option key={tz.index} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </FormControl>
    </FormGroup>
  );
};

export default Timezones;
