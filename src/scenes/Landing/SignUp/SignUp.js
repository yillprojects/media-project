import React, { Component } from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

import SignUpTabs from './components/SignUpTabs.js';

import './signup.scss';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2'
    };
  }

  toggle(tab) {
    const { activeTab } = this.state;

    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="signup-section">
        <div className="inner">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  this.toggle('1');
                }}
              >

                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  this.toggle('2');
                }}
              >

                Login
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <SignUpTabs activeTab={activeTab} />
      </div>
    );
  }
}
