import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions, authenticationActions } from "redux/actions/index.js";

import { IoIosCube } from "react-icons/io";
import {
  FaTimes,
  FaHome,
  FaUser,
  FaRegStar,
  FaRegGrinWink,
  FaHeadphonesAlt,
  FaRegCalendarAlt,
  FaRegChartBar,
  FaSlidersH,
  FaSignOutAlt
} from "react-icons/fa";

import User from "../Navbar/components/UserDropdown/User.js";

class SidebarMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false,
      loggedIn: true
    };

    this.toggle = this.toggle.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  toggle() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  handleLogOut() {
    const { dispatch } = this.props;
    dispatch(authenticationActions.logout());
    localStorage.removeItem("currentUser");
    const { loggedIn } = this.state;
    this.setState({
      loggedIn: !loggedIn
    });
  }

  render() {
    const { isSidebarOpen } = this.state;
    const { status } = this.props;
    const id = localStorage.getItem("currentUserId");

    return (
      <div className="sidebar-mobile">
        <header
          className={`fixed-sidebar-header sidebar-left-header ${
            isSidebarOpen === true ? "active" : ""
          }`}
        >
          <h1>
            <button
              type="button"
              onClick={() => {
                this.toggle();
              }}
              className="sidebar-logo sidebar-logo-icon"
            >
              <IoIosCube />
              <span className="sr-only">Website logo</span>
            </button>
          </h1>
        </header>
        <div
          className={`fixed-sidebar-left ${
            isSidebarOpen === true ? "active" : ""
          }`}
        >
          <header className="fixed-sidebar-header">
            <h2>
              <Link
                to={`/user${id}/newsfeed`}
                className="sidebar-logo sidebar-left-logo"
              >
                <IoIosCube />
                <span className="logo-text">Social Website</span>
                <span className="sr-only">Website logo</span>
              </Link>
            </h2>
          </header>
          <div className="fixed-sidebar-content">
            <User status={status} />
            <div className="ui-block-title">
              <h6 className="title">Main sections</h6>
            </div>
            <ul className="left-menu">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    this.toggle();
                  }}
                  className="sidebar-open left-menu-title"
                >
                  <FaTimes />
                  <span>Collapse Menu</span>
                </button>
              </li>
              <li>
                <Link
                  to={`/user${id}/newsfeed`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaHome />
                  <span>Newsfeed</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/user${id}/timeline`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaUser />
                  <span>User page</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/user${id}/favourite`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaRegStar />
                  <span>Fav pages feed</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/user${id}/groups`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaRegGrinWink />
                  <span>Friend Groups</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/user${id}/playlist`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaHeadphonesAlt />
                  <span>Music & Playlists</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/user${id}/calendar`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaRegCalendarAlt />
                  <span>Calendar and Events</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/user${id}/statistic`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaRegChartBar />
                  <span>Account Stats</span>
                </Link>
              </li>
            </ul>
            <div className="ui-block-title">
              <h6 className="title">Your Account</h6>
            </div>
            <ul className="left-menu account-section">
              <li>
                <Link
                  to={`/user${id}/settings`}
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaSlidersH />
                  <span>Profile Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/createfavourite"
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <FaRegStar />
                  <span>Create Fav Page</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="left-menu-title"
                  onClick={this.handleLogOut}
                >
                  <FaSignOutAlt />
                  <span>Log Out</span>
                </Link>
              </li>
            </ul>
            <div className="ui-block-title">
              <h6 className="title">About Website</h6>
            </div>
            <ul className="left-menu contact-section">
              <li>
                <Link
                  to="/terms"
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <span>Term and Conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={() => {
                    this.toggle();
                  }}
                  className="left-menu-title"
                >
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status } = state.user;
  return {
    status
  };
};

export default connect(mapStateToProps)(SidebarMobile);
