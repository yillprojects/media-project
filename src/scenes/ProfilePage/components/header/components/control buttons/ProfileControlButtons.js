import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FaRegGrinBeam, FaRegEnvelope, FaSlidersH } from 'react-icons/fa';

import './controlbuttons.scss';
import client from "../../../../../../axiosClient";

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

  follow = receiver => {
	const token = localStorage.getItem('token');
	const axios = client(token);

	axios
		.post(`api/profiles/follow`, {
			receiver,
		})
};

  render() {
    const { dropdownOpen } = this.state;
    const { isCurrent, userId } = this.props;

    return (
      <div className="control-block-button">
        {
          !isCurrent?
              <button
                type="button"
                onClick={() => this.follow(userId)}
                className="btn btn-control bg-blue">
              <FaRegGrinBeam />
            </button> : ""
        }
        <button type="button" className="btn btn-control bg-purple">
          <FaRegEnvelope />
        </button>
        {
          isCurrent?
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
