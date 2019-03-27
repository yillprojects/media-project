import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { userActions } from "redux/actions/index.js";

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

class UserDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false,
			status: ""
		};

		this.toggle = this.toggle.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
	}

	componentWillMount() {
		this.setState({
			status: this.props.status
		})
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

	onRadioBtnClick(rSelected) {
		if (this.state.status !== rSelected) {
			this.setState({
				status: rSelected
			});

			const { dispatch } = this.props;
			dispatch(userActions.changeStatus(rSelected));
		}
	}

	render() {
		const { dropdownOpen, status } = this.state;

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
					<User status={status} />
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
							<button
								type="button"
								onClick={() => this.onRadioBtnClick("online")}
								className={`chat-settings-btn ${status === "online" ? "disabled" : ""}`}
							>
								<span className="icon-status online">{""}</span>
								<span className="status">Online</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => this.onRadioBtnClick("away")}
								className={`chat-settings-btn ${status === "away" ? "disabled" : ""}`}
							>
								<span className="icon-status away">{""}</span>
								<span className="status">Away</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => this.onRadioBtnClick("disconnected")}
								className={`chat-settings-btn ${status === "disconnected" ? "disabled" : ""}`}
							>
								<span className="icon-status disconnected">{""}</span>
								<span className="status">Disconnected</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => this.onRadioBtnClick("invisibly")}
								className={`chat-settings-btn ${status === "invisibly" ? "disabled" : ""}`}
							>
								<span className="icon-status invisibly">{""}</span>
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

const mapStateToProps = state => {
	const { status } = state.status;
	return {
		status
	};
};

export default connect(mapStateToProps)(UserDropdown);
