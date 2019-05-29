import React, { Component } from "react";
import { connect } from "react-redux";

import { userActions } from "redux/actions/index.js";

import Calendar from "./components/calendar/Calendar.js";
import BirthdayWidget from "./components/birthdayWidget/BirthdayWidget.js";
import ShareWidget from "./components/shareWidget/shareWidget.js";
import NewsfeedForm from "./components/newsfeedForm/NewsfeedForm.js";
import SuggestedPages from "./components/suggestedPages/SuggestedPages.js";

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
          <div className="col col-xl-6 order-xl-2 col-lg-12 col-md-12 col-sm-12 col-12">
            <NewsfeedForm />
          </div>
          <div className="col col-xl-3 order-xl-1 col-lg-6 col-md-6 col-sm-6 col-12">
            <Calendar />
            <BirthdayWidget />
          </div>

          <div className="col col-xl-3 order-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <ShareWidget />
            <SuggestedPages />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Newsfeed);
