import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import { FaRegSmileWink } from "react-icons/fa";

const Suggestions = props => {
	const options = props.results.map((person, index) => index <= 7 ? (
		<li key={person.id} className="user-search-item notification-item">
			<img
				src="https://via.placeholder.com/30"
				alt="user-img"
				style={{ height: 30, width: 30 }}
				className="notification-item-img"
			/>
			<div className="notification-event">
				<Link to="#" className="notification-friend">
					{person.username}
				</Link>
				<p className="chat-message-item">New York, NY</p>
			</div>
			<div className="notification-icon">
				<Button className="send-request transparent-btn">
					<FaRegSmileWink />
				</Button>
			</div>
		</li>
	) : '');
	return <ul className="user-search">{options}</ul>;
};

export default Suggestions;
