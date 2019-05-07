import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Dropdown, DropdownToggle, DropdownMenu, Button
} from 'reactstrap';

import './dropdown.scss';

export default class NavbarDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.renderNoData = this.renderNoData.bind(this);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  renderNoData() {
    return (
      <p className="no-data-message">No notifications found</p>
    )
  }

  render() {
    const Icon = this.props.icon;
    const { data, children } = this.props;

    const { dropdownOpen } = this.state;
    return (
      <Dropdown
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="navbar-dropdown"
      >
        <DropdownToggle className="dropdown-btn transparent-btn">
          <Icon style={dropdownOpen ? { fill: data.color } : null} />
        </DropdownToggle>
        <DropdownMenu right>
          <header className="dropdown-header dropdown-header-nav">
            <h6 className="title">{data.title}</h6>
            <div className="header-secondary">
              <Link to="/settings">Settings</Link>
              <Link
                to={{
                  pathname: `/${data.link}`
                }}
              >
                {data.action}
              </Link>
            </div>
          </header>
          <div className="dropdown-menu-list">{children ? children : this.renderNoData()}</div>
          <Button
            className="dropdown-menu-btn"
            style={{
              backgroundColor: data.color,
              borderColor: data.color
            }}
          >
            {data.btnTitle}
          </Button>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
