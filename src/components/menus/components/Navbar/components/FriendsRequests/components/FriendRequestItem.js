import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

import defaultAvatar from '../../../../../../../backend/static/profiles/defaultProfileAvatar.jpg';
import './friendRequestItem.scss'

const host = "http://localhost:8000/media/profiles/";

const FriendRequestItem = ({ data, accept }) => {
	const { id, avatar, full_name } = data;
	return (
		<div className="dropdown-item notification-item">
			<img
				src={avatar? `${host}${avatar}` : defaultAvatar}
				alt="user avatar"
				style={{ heigh: 30, width: 30 }}
				className="notification-item-img"
			/>
			<div className="notification-event">
				<Link
					to={`/user${id}/timeline`}
					className="notification-friend"
				>
					{full_name}
				</Link>
				<p className="chat-message-item">want to become your friend</p>
			</div>
			<div className="notification-icon">
				<Button className="accept-request" onClick={() => accept(id)}>
					<FaUserPlus />
				</Button>
				<Button className="request-del">
					<FaUserMinus />
				</Button>
			</div>
		</div>
	);
};

export default FriendRequestItem;
