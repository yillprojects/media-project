import React, { Component } from "react";
import { connect } from "react-redux";

import { userActions } from "redux/actions/index.js";

class Newsfeed extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.currentPage("1"));
  }

  render() {
    return (
      <div className="newsfeed">

      </div>
    );
  }
}

export default connect()(Newsfeed);
