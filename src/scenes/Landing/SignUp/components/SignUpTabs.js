import React, { Component } from 'react';

import { TabPane, TabContent } from 'reactstrap';

import Login from './components/Login/Login.js';

import './signuptabs.scss';

export default class SignUpTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TabContent activeTab={this.props.activeTab}>
        <TabPane tabId="1">
        </TabPane>
        <TabPane tabId="2">
        	<Login />
        </TabPane>
      </TabContent>
    );
  }
}