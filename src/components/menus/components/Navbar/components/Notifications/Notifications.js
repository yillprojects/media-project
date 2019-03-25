import React, { Component } from "react";

import NavbarDropdown from "./../secondary/NavbarDropdown.js";

import { FaRegBell } from "react-icons/fa";

export default class Notifications extends Component {
	render() {
		const details = {
			title: "Notifications",
			action: "Mark all as read",
			link: "notifications",
			btnTitle: "View all notifications",
			color: '#ff5e3a'
		};
		return <NavbarDropdown icon={FaRegBell} data={details} />;
	}
}
