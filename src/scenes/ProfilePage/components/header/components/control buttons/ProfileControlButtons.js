import React, { Component } from "react";

import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FaRegGrinBeam, FaRegEnvelope, FaSlidersH } from "react-icons/fa";

import "./controlbuttons.scss";

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

	render() {
		const { dropdownOpen } = this.state;

		return (
			<div className="control-block-button">
				<a href="#" className="btn btn-control bg-blue">
					<FaRegGrinBeam />
				</a>
				<a href="#" className="btn btn-control bg-purple">
					<FaRegEnvelope />
				</a>
				<Dropdown
					onMouseOver={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
					direction={screen.width < 768 ? "down" : "up"}
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
								<a href="#" className="settings-link">
									Update Profile Photo
								</a>
							</li>
							<li>
								<a href="#" className="settings-link">
									Update Header Photo
								</a>
							</li>
							<li>
								<a href="#" className="settings-link">
									Account Settings
								</a>
							</li>
						</ul>
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
