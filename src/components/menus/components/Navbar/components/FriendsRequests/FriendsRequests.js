import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _map from 'lodash/map';

import { DropdownItem, Button } from 'reactstrap';

import { FaRegGrinBeam, FaUserPlus, FaUserMinus } from 'react-icons/fa';

import NavbarDropdown from '../secondary/NavbarDropdown.js';

import User from './50.png';

export default class FriendsRequests extends Component {
  render() {
    const FriendsList = () => {
      const data = [
        {
          id: 1,
          username: 'bebe bebe',
          link: 'bebe'
        },
        {
          id: 2,
          username: 'lola bebe',
          link: 'lola'
        },
        {
          id: 3,
          username: 'koko bebe',
          link: 'koko'
        }
      ];

      return _map(data, (item, index) => (
        <div key={item.id} className="dropdown-item">
          <img
            src={User}
            style={{ heigh: 30, width: 30 }}
            className="dropdown-item-img"
          />
          <div className="notification-event">
            <Link
              to={{
							  pathname: `/${item.link}`
              }}
              className="notification-friend"
            >
              {item.username}
            </Link>
            <p className="chat-message-item">want to become your friend</p>
          </div>
          <div className="notification-icon">
            <Button className="accept-request">
              <FaUserPlus />
            </Button>
            <Button className="request-del">
              <FaUserMinus />
            </Button>
          </div>
        </div>
      ));
    };

    const details = {
      title: 'Friend request',
      action: 'Find Friends',
      link: 'findfriends',
      btnTitle: 'Check all your events',
      color: '#38a9ff'
    };

    return (
      <NavbarDropdown
        icon={FaRegGrinBeam}
        children={<FriendsList />}
        data={details}
      />
    );
  }
}
