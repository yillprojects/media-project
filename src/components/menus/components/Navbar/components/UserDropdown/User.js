import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaChevronDown } from 'react-icons/fa';

import UserImg from '../FriendsRequests/50.png';

export default class User extends Component {
  render() {
  	const { status } = this.props;

    return (
      <div className="user">
        <div className="user-thumb">
          <span className="sr-only">User</span>
          <img
            src={UserImg}
            alt="user-avatar"
            style={{ width: 35, height: 35 }}
            className="user-img"
          />
          <span className={`icon-status  ${status || 'online'}`} />
        </div>
        <div className="user-name">
          <div className="user-title">
            <h5>Kames Spiegel</h5>
            <FaChevronDown />
          </div>
          <span className="user-subtitle">Space cowboy</span>
        </div>
      </div>
    );
  }
}
