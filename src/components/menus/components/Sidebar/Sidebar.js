import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { userActions } from "redux/actions/index.js";

import Tooltip from "@material-ui/core/Tooltip";

import { IoIosCube } from "react-icons/io";
import {
  FaHome,
  FaUser,
  FaRegStar,
  FaRegGrinWink,
  FaHeadphonesAlt,
  FaRegCalendarAlt,
  FaRegChartBar
} from "react-icons/fa";

import SidebarMobile from "./SidebarMobile.js";
import "./sidebar.scss";

class SidebarNo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1"
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    const { page } = this.props;

    this.setState({
      activeTab: page
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTab: nextProps.page
    });
  }

  toggle(tab) {
    const { activeTab } = this.state;

    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }

    const { dispatch } = this.props;
    dispatch(userActions.currentPage(tab));
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="fixed-sidebar">
        <div className="sidebar-laptop">
          <header className="fixed-sidebar-header">
            <h1>
              <Link to="/newsfeed" className="sidebar-logo sidebar-logo-icon">
                <IoIosCube />
                <span className="sr-only">Website logo</span>
              </Link>
            </h1>
          </header>
          <ul className="sidebar-nav">
            <li className="sidebar-nav-item">
              <Link
                to="/newsfeed"
                className={`sidebar-nav-link ${
                  activeTab === "1" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                <Tooltip title="NEWSFEED" placement="right">
                  <FaHome />
                </Tooltip>
                <span className="sr-only">Newsfeed</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link
                to="/user/timeline"
                className={`sidebar-nav-link ${
                  activeTab === "2" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                <Tooltip title="PROFILE PAGE" placement="right">
                  <FaUser />
                </Tooltip>
                <span className="sr-only">User page</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link
                to="/favourite"
                className={`sidebar-nav-link ${
                  activeTab === "3" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                <Tooltip title="FAV PAGES" placement="right">
                  <FaRegStar />
                </Tooltip>
                <span className="sr-only">Fav pages</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link
                to="/groups"
                className={`sidebar-nav-link ${
                  activeTab === "4" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("4");
                }}
              >
                <Tooltip title="FRIEND GROUPS" placement="right">
                  <FaRegGrinWink />
                </Tooltip>
                <span className="sr-only">Friend groups</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link
                to="/playlist"
                className={`sidebar-nav-link ${
                  activeTab === "5" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("5");
                }}
              >
                <Tooltip title="MUSIC & PLAYLISTS" placement="right">
                  <FaHeadphonesAlt />
                </Tooltip>
                <span className="sr-only">Music and playlists</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link
                to="/calendar"
                className={`sidebar-nav-link ${
                  activeTab === "6" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("6");
                }}
              >
                <Tooltip title="CALENDAR & EVENTS" placement="right">
                  <FaRegCalendarAlt />
                </Tooltip>
                <span className="sr-only">Calendar and events</span>
              </Link>
            </li>
            <li className="sidebar-nav-item">
              <Link
                to="/statistic"
                className={`sidebar-nav-link ${
                  activeTab === "7" ? "active " : ""
                }`}
                onClick={() => {
                  this.toggle("7");
                }}
              >
                <Tooltip title="ACCOUNT STATS" placement="right">
                  <FaRegChartBar />
                </Tooltip>
                <span className="sr-only">Statisic</span>
              </Link>
            </li>
          </ul>
        </div>
        <SidebarMobile />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { page } = state.direction;
  return {
    page
  };
};

const Sidebar = withRouter(SidebarNo);

export default connect(mapStateToProps)(Sidebar);
