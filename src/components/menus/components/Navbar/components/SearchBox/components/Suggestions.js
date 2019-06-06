import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import { FaRegSmileWink } from "react-icons/fa";

import defaultAvatar from '../../../../../../../backend/static/profiles/defaultProfileAvatar.jpg';

const host = 'http://localhost:8000/';

const Suggestions = props => {
	const options = props.results.map((person, index) => index <= 7 ? (
		<li key={person.id} className="user-search-item notification-item">
			<img
				src={person.avatar? `${host}media/${person.avatar}` : defaultAvatar}
				alt="user-img"
				style={{ height: 30, width: 30 }}
				className="notification-item-img"
			/>
			<div className="notification-event">
				<Link to="#" className="notification-friend">
					{`${person.first_name} ${person.last_name}`}
				</Link>
				<p className="chat-message-item">
					{`${person.location.city? `${person.location.city.name}, ` : ''}
					  ${person.location.country? person.location.country.name : ''}`}
				</p>
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
