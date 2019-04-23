import React, { Component } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DayPickerRangeController } from 'react-dates';

import './calendar.scss' 

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  render() {
    const { startDate, endDate, focusedInput } = this.state;
    return (
      <div className="calendar">
        <div className="calendar-wrapper">
          <DayPickerRangeController
            startDate={startDate}
            endDate={endDate}
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            }
            focusedInput={focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            className="kek"
          />
        </div>
      </div>
    );
  }
}

const defaultProps = {
  numberOfMonths: 1,
  monthFormat: 'MMMM YYYY'
};

Calendar.defaultProps = defaultProps;
