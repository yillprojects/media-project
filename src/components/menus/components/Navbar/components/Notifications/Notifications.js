import React, { Component } from 'react';

import { FaRegBell } from 'react-icons/fa';
import NavbarDropdown from '../secondary/NavbarDropdown.js';


export default class Notifications extends Component {
  render() {
    const details = {
      title: 'Notifications',
      action: 'Mark all as read',
      link: 'notifications',
      btnTitle: 'View all notifications',
      color: '#ff5e3a'
    };
    return <NavbarDropdown icon={FaRegBell} data={details} />;
  }
}
