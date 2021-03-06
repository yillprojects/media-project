import React, { Component } from 'react';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import './calendar.scss';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    return (
      <div className="calendar mb-3">
        <div className="calendar-wrapper">
          <InfiniteCalendar
            height={400}
            selected={today}
            disabledDays={[0, 6]}
            minDate={lastWeek}
          />
        </div>
      </div>
    );
  }
}
