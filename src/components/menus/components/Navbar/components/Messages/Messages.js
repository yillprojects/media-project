import React, { Component } from "react";

import NavbarDropdown from "./../secondary/NavbarDropdown.js";

import { FaRegEnvelope } from "react-icons/fa";

export default class Messages extends Component {
	render() {
		const details = {
			title: "Chat/Messages",
			action: "Mark all as read",
			link: "findfriends",
			btnTitle: "View all messages",
			color: '#7c5ac2'
		};

		return <NavbarDropdown icon={FaRegEnvelope} data={details} />;
	}
}
