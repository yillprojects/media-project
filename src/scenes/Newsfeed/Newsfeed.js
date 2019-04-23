import React, { Component } from "react";
import { connect } from "react-redux";

import { userActions } from "redux/actions/index.js";

import Calendar from "./components/calendar/Calendar.js";
import BirthdayWidget from "./components/birthdayWidget/birthdayWidget.js";
import ShareWidget from "./components/shareWidget/shareWidget.js";

class Newsfeed extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.currentPage("1"));
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
            <Calendar />
            <BirthdayWidget />
            <ShareWidget />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Newsfeed);
