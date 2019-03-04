import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TabPane, TabContent } from 'reactstrap';

import Login from './components/Login/Login.js';

import './signuptabs.scss';

export default class SignUpTabs extends Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  updateState(state = {}) {
    this.props.update(state);
  }

  render() {
    return (
      <TabContent activeTab={this.props.activeTab}>
        <TabPane tabId="1" />
        <TabPane tabId="2">
          <Login update={this.updateState} />
        </TabPane>
      </TabContent>
    );
  }
}

SignUpTabs.propTypes = {
  update: PropTypes.func,
  activeTab: PropTypes.string
};
