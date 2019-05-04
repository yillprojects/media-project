import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import _map from "lodash/map";

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

import { arrowGenerator, styles } from "config/tooltipConfig.js";

import SidebarMobile from "./SidebarMobile.js";
import "./sidebar.scss";

const btn = [
  {
    id: 1,
    link: "/newsfeed",
    tooltip: "NEWSFEED",
    icon: <FaHome />
  },
  {
    id: 2,
    link: "/user/timeline",
    tooltip: "PROFILE PAGE",
    icon: <FaUser />
  },
  {
    id: 3,
    link: "/favourite",
    tooltip: "FAV PAGES",
    icon: <FaRegStar />
  },
  {
    id: 4,
    link: "/groups",
    tooltip: "FRIEND GROUPS",
    icon: <FaRegGrinWink />
  },
  {
    id: 5,
    link: "/playlist",
    tooltip: "MUSIC & PLAYLISTS",
    icon: <FaHeadphonesAlt />
  },
  {
    id: 6,
    link: "/calendar",
    tooltip: "CALENDAR & EVENTS",
    icon: <FaRegCalendarAlt />
  },
  {
    id: 7,
    link: "/statistic",
    tooltip: "ACCOUNT STATS",
    icon: <FaRegChartBar />
  }
];

class SidebarItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      arrowRef: null
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
    if (tab == 2) {
      dispatch(userActions.currentProfileTab(1));
    }
  }

  render() {
    const { activeTab } = this.state;
    const { classes } = this.props;

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
            {_map(btn, item => {
              return (
                <li className="sidebar-nav-item" key={item.id}>
                  <Link
                    to={item.link}
                    className={`sidebar-nav-link ${
                      activeTab == item.id ? "active " : ""
                    }`}
                    onClick={() => {
                      this.toggle(item.id);
                    }}
                  >
                    <Tooltip
                      placement="right"
                      title={
                        <React.Fragment>
                          {item.tooltip}
                          <span
                            className={classes.arrow}
                          />
                        </React.Fragment>
                      }
                      classes={{ popper: classes.arrowPopper }}
                      PopperProps={{
                        popperOptions: {
                          modifiers: {
                            arrow: {
                              enabled: Boolean(this.state.arrowRef),
                              element: this.state.arrowRef
                            }
                          }
                        }
                      }}
                    >
                      {item.icon}
                    </Tooltip>
                  </Link>
                </li>
              );
            })}
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

const Sidebar = withStyles(styles)(withRouter(SidebarItem));

export default connect(mapStateToProps)(Sidebar);
