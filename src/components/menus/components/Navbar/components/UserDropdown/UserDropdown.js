import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavItem
} from "reactstrap";

import { FaRegStar, FaSlidersH, FaSignOutAlt } from "react-icons/fa";

import User from "./User.js";

import "./userdropdown.scss";

export default class UserDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false
		};

		this.toggle = this.toggle.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
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
			<Dropdown
				onMouseOver={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				isOpen={dropdownOpen}
				toggle={this.toggle}
				className="user-dropdown"
			>
				<DropdownToggle
					tag="span"
					data-toggle="dropdown"
					aria-expanded={dropdownOpen}
				>
					<User />
				</DropdownToggle>
				<DropdownMenu>
					<div className="ui-block-title">
						<h6 className="title">Your account</h6>
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
						<h6 className="title">Chat settings</h6>
					</div>
					<ul className="chat-settings">
						<li>
							<button type="button" className="chat-settings-btn">
								<span className="icon-status online">{""}</span>
								<span className="status">Online</span>
							</button>
						</li>
						<li>
							<button type="button" className="chat-settings-btn">
								<span className="icon-status away">{""}</span>
								<span className="status">Away</span>
							</button>
						</li>
						<li>
							<button type="button" className="chat-settings-btn">
								<span className="icon-status disconnected">{""}</span>
								<span className="status">Disconnected</span>
							</button>
						</li>
						<li>
							<button type="button" className="chat-settings-btn">
								<span className="icon-status invisible">{""}</span>
								<span className="status">Invisible</span>
							</button>
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
				</DropdownMenu>
			</Dropdown>
		);
	}
}
