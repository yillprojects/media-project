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
    this.clearMessage = this.clearMessage.bind(this);

    this.state = {
      flashClass: false
    };
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
    const { activeTab, alert } = this.props;

    if (alert.message != nextProps.alert.message) {
      setTimeout(() => {
        if (nextProps.alert.type == "alert-success") {
          this.updateState("2");
        }
        this.setState({ flashClass: true });
      }, 300);
      setTimeout(() => {
        this.setState({ flashClass: false });
      }, 5000);
      this.clearMessage();
    }
  }

  clearMessage() {
    setTimeout(() => {
      const { dispatch } = this.props;
      dispatch(alertActions.clear());
    }, 5300);
  }

  updateState(state = {}) {
    const { update } = this.props;
    update(state);
  }

  render() {
    const { flashClass } = this.state;
    const { activeTab, alert, registering } = this.props;
    const flash = flashClass ? "alert-open" : "";

    return (
      <TabContent activeTab={activeTab}>
        {alert.message ? (
          <div className={flash + ` alert ${alert.type}`}>{alert.message}</div>
        ) : (
          ""
        )}

        {alert.message ? console.log("should be a message") : ""}
        <TabPane tabId="1">
          <Register />
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
