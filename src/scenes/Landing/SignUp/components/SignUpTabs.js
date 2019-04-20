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
    console.log(nextProps);

    const { activeTab, alert } = this.props;
    if (activeTab != nextProps.activeTab && alert.type != "alert-success") {
      const { dispatch } = this.props;
      dispatch(alertActions.clear());

      this.setState({
        flashClass: false
      });
    }

    if (alert.message != nextProps.alert.message) {
      setTimeout(() => {
        if (nextProps.alert.type == "alert-success") {
          this.updateState("2");
        }
        this.setState({ flashClass: true });
      }, 150);

      setTimeout(() => {
        this.setState({ flashClass: false });
      }, 5000);
    }
  }

  updateState(state = {}) {
    const { update } = this.props;
    update(state);
  }

  render() {
    const { flashClass } = this.state;
    console.log(flashClass);
    const { activeTab, alert, registering } = this.props;
    const flash = flashClass ? "alert-open" : "";
    console.log(flash);

    return (
      <TabContent activeTab={activeTab}>
        {alert.message ? (
          <div className={flash + ` alert ${alert.type}`}>{alert.message}</div>
        ) : (
          ""
        )}
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
