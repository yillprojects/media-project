import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FaRegGrinBeam, FaRegEnvelope, FaSlidersH } from 'react-icons/fa';

import './controlbuttons.scss';

export default class ProfileControlButtons extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      dropdownOpen: false
    };
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { dropdownOpen } = this.state;
    const { show } = this.props;

    return (
      <div className="control-block-button">
        <a href="#" className="btn btn-control bg-blue">
          <FaRegGrinBeam />
        </a>
        <a href="#" className="btn btn-control bg-purple">
          <FaRegEnvelope />
        </a>
        {
          show?
              <Dropdown
                onMouseOver={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onMouseEnter}
                direction={screen.width < 768 ? 'down' : 'up'}
                isOpen={dropdownOpen}
                toggle={this.toggle}
                className="btn btn-control bg-orange"
              >
                <DropdownToggle className="transparent-btn">
                  <FaSlidersH />
                </DropdownToggle>
                <DropdownMenu right>
                  <ul className="more-settings">
                    <li>
                      <Link to="#" className="settings-link">

                        Update Profile Photo
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="settings-link">

                        Update Header Photo
                      </Link>
                    </li>
                    <li>
                      <Link to={`/settings`} className="settings-link">

                        Account Settings
                      </Link>
                    </li>
                  </ul>
                </DropdownMenu>
              </Dropdown> :
              null
        }
      </div>
    );
  }
}
