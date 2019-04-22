import React, { Component } from "react";

import { Navbar, Nav, NavItem } from "reactstrap";

import SearchBox from "./components/SearchBox/SearchBox.js";
import FriendsRequests from "./components/FriendsRequests/FriendsRequests.js";
import Messages from "./components/Messages/Messages.js";
import Notifications from "./components/Notifications/Notifications.js";
import UserDropdown from "./components/UserDropdown/UserDropdown.js";

import "./navbar.scss";

export default class NavbarMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar light fixed="top">
        <SearchBox />

        <Nav navbar>
          <NavItem>
            <FriendsRequests />
          </NavItem>
          <NavItem>
            <Messages />
          </NavItem>
          <NavItem>
            <Notifications />
          </NavItem>
          <NavItem>
            <UserDropdown />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
