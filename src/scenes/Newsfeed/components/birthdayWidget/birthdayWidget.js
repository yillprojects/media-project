import React, { Component } from 'react';

import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { FaBirthdayCake, FaEllipsisH } from 'react-icons/fa';

import User from './img/user.png';
import './birthdayWidget.scss';

class BirthdayWidget extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { dropdownOpen } = this.state;

    return (
      <div className="widget w-birthday-alert mb-3">
        <div className="icon-block">
          <FaBirthdayCake />
          <div className="more">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={this.toggle}
              direction="down"
            >
              <DropdownToggle className="transparent-btn">
                <FaEllipsisH />
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="more-settings">
                  <li>
                    <a href="#" className="profile-menu-link">

                      Send message
                    </a>
                  </li>
                  <li>
                    <a href="#" className="profile-menu-link">

                      Discard widget
                    </a>
                  </li>
                </ul>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="content">
          <div className="author-thumb">
            <img
              src={User}
              alt="user-img"
              styles={{ height: 25, weight: 25 }}
            />
          </div>
          <span>Today is</span>
          <h4 className="title">
            <a href="#">Marina Valentine's Birthday</a>
          </h4>
          <p>Leave her a message with your best wishes on her profile page!</p>
        </div>
      </div>
    );
  }
}

export default BirthdayWidget;
