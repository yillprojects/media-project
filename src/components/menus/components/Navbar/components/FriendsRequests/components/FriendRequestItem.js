import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

import User from '../50.png';
import './friendRequestItem.scss'

const FriendRequestItem = props => {
	const { data } = props;
	return (
		<div className="dropdown-item notification-item">
			<img
				src={User}
				style={{ heigh: 30, width: 30 }}
				className="notification-item-img"
			/>
			<div className="notification-event">
				<Link
					to={{
						pathname: `/${data.link}`
					}}
					className="notification-friend"
				>
					{data.username}
				</Link>
				<p className="chat-message-item">want to become your friend</p>
			</div>
			<div className="notification-icon">
				<Button className="accept-request">
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
