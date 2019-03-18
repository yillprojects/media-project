import React, { Component } from "react";
import { Link } from "react-router-dom";

import MediaQuery from 'react-responsive';

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

import SidebarMobile from './SidebarMobile.js';
import "./sidebar.scss";


export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTab: nextProps.page
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="fixed-sidebar">
      <MediaQuery query="(min-device-width: 769px)">
        <header className="fixed-sidebar-header">
          <h1>
            <Link to="/home" className="sidebar-logo sidebar-logo-icon">
              <IoIosCube />
              <span className="sr-only">Website logo</span>
            </Link>
          </h1>
        </header>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <Link
              to="/home"
              className={`sidebar-nav-link ${
                activeTab === "1" ? "active " : ""
              }`}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <FaHome />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link
              to="/user"
              className={`sidebar-nav-link ${
                activeTab === "2" ? "active " : ""
              }`}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <FaUser />
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
              <FaRegStar />
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
              <FaRegGrinWink />
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
              <FaHeadphonesAlt />
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
              <FaRegCalendarAlt />
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
              <FaRegChartBar />
              <span className="sr-only">Statisic</span>
            </Link>
          </li>
        </ul>
      </MediaQuery>
      <SidebarMobile />
      </div>
    );
  }
}