import React from "react";
import { Link } from "react-router-dom";
import client from 'axiosClient';

import { Button } from "reactstrap";
import { FaRegSmileWink, FaRegUser } from "react-icons/fa";

import defaultAvatar from '../../../../../../../backend/static/profiles/defaultProfileAvatar.jpg';


const host = 'http://localhost:8000/';

const follow = receiver => {
	const token = localStorage.getItem('token');
	const axios = client(token);

	axios
		.post(`api/profiles/follow`, {
			receiver,
		})
};

const Suggestions = ({ results, handlePageLeft }) => {
	const options = results.slice(0, Math.max(7, results.length)).map(person => {
		const { avatar, id, full_name, location: { city, country }, is_friend, is_current } = person;
		return (
			<li key={id} className="user-search-item notification-item">
				{/* eslint-disable-next-line no-tabs */}
				<Link to={`/user${id}/timeline`} className="notification-friend">
					<img
						src={avatar? `${host}media/${avatar}` : defaultAvatar}
						alt="user-img"
						style={{ height: 30, width: 30 }}
						className="notification-item-img"
					/>
				</Link>
				<div className="notification-event">
					<Link to={`/user${id}/timeline`} className="notification-friend" onClick={handlePageLeft}>
						{full_name}
					</Link>
					<p className="chat-message-item">
						{`${city? `${city.name}, ` : ''}
						  ${country? country.name : ''}`}
					</p>
				</div>
				<div className="notification-icon">
					<Button
						className={`send-request transparent-btn
							${is_friend? " already-friends" : ""}
							${is_current? " current" : ""}
						`}
						onClick={is_current? null : () => follow(id)}
					>
						{ !is_current? <FaRegSmileWink /> : <FaRegUser /> }
					</Button>
				</div>
			</li>
		);
	});
	return <ul className="user-search">{options}</ul>;
};

export default Suggestions;
