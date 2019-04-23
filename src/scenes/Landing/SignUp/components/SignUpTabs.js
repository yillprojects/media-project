import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TabPane, TabContent } from "reactstrap";

import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";

import { alertActions } from "redux/actions/index.js";

import "./signuptabs.scss";

class SignUpTabs extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);

    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(alertActions.clear());
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { activeTab, alert, dispatch } = this.props;
    console.log(alert.type);

    if (activeTab != nextProps.activeTab) {
      dispatch(alertActions.clear());
    }
  }

  updateState(state = {}) {
    const { update } = this.props;
    update(state);
  }

  render() {
    const { activeTab, alert, registering } = this.props;

    return (
      <TabContent
        activeTab={activeTab}
        className={`${
          activeTab == 2 ? "border-right-radius" : "border-left-radius"
        }`}
      >
        {alert.message ? (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        ) : (
          ""
        )}

        <TabPane tabId="1">
          <Register update={this.updateState} />
        </TabPane>
        <TabPane tabId="2">
          <Login update={this.updateState} />
        </TabPane>
      </TabContent>
    );
  }
}

const mapStateToProps = state => {
  const { alert } = state;

  return {
    alert
  };
};

export default connect(mapStateToProps)(SignUpTabs);

SignUpTabs.propTypes = {
  update: PropTypes.func,
  activeTab: PropTypes.string
};
