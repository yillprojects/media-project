import React from "react";
import { Link } from "react-router-dom";
import client from 'axiosClient';

import { Button } from "reactstrap";
import { FaRegSmileWink } from "react-icons/fa";

import defaultAvatar from '../../../../../../../backend/static/profiles/defaultProfileAvatar.jpg';


const host = 'http://localhost:8000/';

const follow = receiver => {
	const token = localStorage.getItem('token');
	const id = localStorage.getItem('currentUserId');
	const axios = client(token);

	axios
		.post(`api/profiles/${id}/follow`, {
			receiver,
		})
};

const Suggestions = ({ results }) => {
	const options = results.slice(0, Math.max(7, results.length)).map(person => (
		<li key={person.id} className="user-search-item notification-item">
			{/* eslint-disable-next-line no-tabs */}
			<img
				src={person.avatar? `${host}media/${person.avatar}` : defaultAvatar}
				alt="user-img"
				style={{ height: 30, width: 30 }}
				className="notification-item-img"
			/>
			<div className="notification-event">
				<Link to={`/user${person.id}/timeline`} className="notification-friend">
					{person.full_name}
				</Link>
				<p className="chat-message-item">
					{`${person.location.city? `${person.location.city.name}, ` : ''}
					  ${person.location.country? person.location.country.name : ''}`}
				</p>
			</div>
			<div className="notification-icon">
				<Button
					className="send-request transparent-btn"
					onClick={() => follow(person.id)}
				>
					<FaRegSmileWink />
				</Button>
			</div>
		</li>
	));
	return <ul className="user-search">{options}</ul>;
};

export default Suggestions;
