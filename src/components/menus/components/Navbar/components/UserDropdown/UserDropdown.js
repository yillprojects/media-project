import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import client from '../../../../../../axiosClient';

import { userActions, authenticationActions } from "redux/actions/index.js";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";

import { FaRegStar, FaSlidersH, FaSignOutAlt, FaCheck } from "react-icons/fa";

import User from "./User.js";

import "./userdropdown.scss";

class UserDropdown extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      status: '',
      inputText: '',
      statusText: '',
      loggedIn: true
    };

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleStatusSubmit = this.handleStatusSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const token = localStorage.getItem('token');
    const axios = client(token);
    const id = localStorage.getItem('currentUserId');

    axios
        .post(`api/profiles/${id}/get_fields`, {
          fields: ['status']
        })
        .then(res => {
          if (this._isMounted) {
            const { status } = res.data.data;

            this.setState({
              inputText: status,
              statusText: status
            })
          }
        });

  }

  componentWillMount() {
    this.setState({
      status: this.props.status
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggle() {
    const { statusText, dropdownOpen } = this.state;

    if (!dropdownOpen) {
      this.setState({
        inputText: statusText
      })
    }

    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    const { statusText } = this.state;

    this.setState({
      dropdownOpen: false,
      inputText: statusText
    })
  }

  onRadioBtnClick(rSelected) {
    if (this.state.status !== rSelected) {
      this.setState({
        status: rSelected
      });

      const { dispatch } = this.props;
      dispatch(userActions.changeStatus(rSelected));
    }
  }

  handleLogOut() {
    const { dispatch } = this.props;
    dispatch(authenticationActions.logout());
    localStorage.removeItem('currentUser');
    const { loggedIn } = this.state;
    this.setState({
      loggedIn: !loggedIn
    });
  }

  handleTabChange() {
    const { dispatch } = this.props;
    dispatch(userActions.currentPage(-1));
  }

  handleStatusChange = event => {
    const { value } = event.target;

    this.setState({
      inputText: value,
    })
  };

  handleStatusSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const axios = client(token);
    const id = localStorage.getItem('currentUserId');
    const { inputText } = this.state;

    axios
        .patch(`api/profiles/${id}`, {
          status: inputText
        })
        .then(res => this.setState({
          statusText: inputText,
        }));
  }

  render() {
    const { dropdownOpen, status, loggedIn, statusText, inputText } = this.state;
    const id = localStorage.getItem("currentUserId");

    if (!loggedIn)
      return (<Redirect to='/' />);

    return (
      <Dropdown
        // onMouseOver={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
        isOpen={dropdownOpen}
        toggle={this.toggle}
        className="user-dropdown"
      >
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <User statusText={statusText} status={status} />
        </DropdownToggle>
        <DropdownMenu>
          <div className="ui-block-title">
            <h6 className="title">Your account</h6>
          </div>
          <ul className="left-menu account-section">
            <li>
              <Link to={`/user${id}/settings`} className="left-menu-title" onClick={this.handleTabChange}>
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
            <h6 className="title">Chat settings</h6>
          </div>
          <ul className="chat-settings">
            <li>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick("online")}
                className={`chat-settings-btn ${
                  status === "online" ? "disabled" : ""
                }`}
              >
                <span className="icon-status online" />
                <span className="status">Online</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick("away")}
                className={`chat-settings-btn ${
                  status === "away" ? "disabled" : ""
                }`}
              >
                <span className="icon-status away" />
                <span className="status">Away</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick("disconnected")}
                className={`chat-settings-btn ${
                  status === "disconnected" ? "disabled" : ""
                }`}
              >
                <span className="icon-status disconnected" />
                <span className="status">Disconnected</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => this.onRadioBtnClick("invisibly")}
                className={`chat-settings-btn ${
                  status === "invisibly" ? "disabled" : ""
                }`}
              >
                <span className="icon-status invisibly" />
                <span className="status">Invisible</span>
              </button>
            </li>
          </ul>
          <div className="ui-block-title">
            <h6 className="title">Custom Status</h6>
          </div>
          <form onSubmit={this.handleStatusSubmit}>
            <InputGroup className="status-input">
              <InputGroupAddon addonType="prepend">
                <Button>
                  <FaCheck />
                </Button>
              </InputGroupAddon>
              <Input value={inputText} onChange={this.handleStatusChange} />
            </InputGroup>
          </form>
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
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  const { status } = state.status;
  return {
    status
  };
};

export default connect(mapStateToProps)(UserDropdown);
