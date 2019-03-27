import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "redux/actions/index.js";

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

import User from "./../Navbar/components/UserDropdown/User.js";

class SidebarMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  render() {
    const { isSidebarOpen } = this.state;
    const { status } = this.props;

    return (
      <div className="sidebar-mobile">
        <header
          className={`fixed-sidebar-header sidebar-left-header ${
            isSidebarOpen === true ? "active" : ""
          }`}
        >
          <h1>
            <button
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
              <Link to="/home" className="sidebar-logo sidebar-left-logo">
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
                <Link to="/home" className="left-menu-title">
                  <FaHome />
                  <span>Newsfeed</span>
                </Link>
              </li>
              <li>
                <Link to="/user" className="left-menu-title">
                  <FaUser />
                  <span>User page</span>
                </Link>
              </li>
              <li>
                <Link to="/favourite" className="left-menu-title">
                  <FaRegStar />
                  <span>Fav pages feed</span>
                </Link>
              </li>
              <li>
                <Link to="/groups" className="left-menu-title">
                  <FaRegGrinWink />
                  <span>Friend Groups</span>
                </Link>
              </li>
              <li>
                <Link to="/playlist" className="left-menu-title">
                  <FaHeadphonesAlt />
                  <span>Music & Playlists</span>
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="left-menu-title">
                  <FaRegCalendarAlt />
                  <span>Calendar and Events</span>
                </Link>
              </li>
              <li>
                <Link to="/statistic" className="left-menu-title">
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
                <Link to="/settings" className="left-menu-title">
                  <FaSlidersH />
                  <span>Profile Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/createfavourite" className="left-menu-title">
                  <FaRegStar />
                  <span>Create Fav Page</span>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="left-menu-title">
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
                <Link to="/terms" className="left-menu-title">
                  <span>Term and Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="left-menu-title">
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="left-menu-title">
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="left-menu-title">
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
  const { status } = state.status;
  return {
    status
  };
};

export default connect(mapStateToProps)(SidebarMobile);
