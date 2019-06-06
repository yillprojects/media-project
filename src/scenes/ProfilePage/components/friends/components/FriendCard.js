import React from "react";

import { FaRegGrinBeam, FaRegEnvelope } from "react-icons/fa";

import "./friendCard.scss";

import defaultAvatar from '../../../../../backend/static/profiles/defaultProfileAvatar.jpg';
import defaultHeader from '../../../../../backend/static/profiles/defaultProfileHeader.jpg';
import { Link } from "react-router-dom";

const host = 'http://localhost:8000/';

const FriendCard = props => {
	const { avatar, id, header, full_name, friends_cnt, location } = props.data;

	return (
		<div className="ui-block">
			<div className="friend-item">
				<div className="friend-header-thumb">
					<img src={header? `${host}/media/${header}` : defaultHeader} alt="friend header" />
				</div>
				<div className="friend-item-content">
					<div className="friend-avatar">
						<div className="author-thumb">
							<img
								src={avatar? `${host}/media/${avatar}` : defaultAvatar}
								alt="friend avatar"
								style={{ height: 92, width: 92 }}
							/>
						</div>
						<div className="author-content">
							<h5 className="title">
								<Link to={`/user${id}/timeline`} className="author-name">
									{full_name}
								</Link>
							</h5>
							<div className="country">
								{location? `${location.city}, ${location.country}` : ''}
							</div>
						</div>
					</div>
					<div className="friend-count">
						<a href="#" className="friend-count-item">
							<p className="count-number">{friends_cnt}</p> Friend{(friends_cnt === 1)? '' : 's'}
						</a>
						<a href="#" className="friend-count-item">
							<p className="count-number">0</p> Photos
						</a>
						<a href="#" className="friend-count-item">
							<p className="count-number">0</p> Videos
						</a>
					</div>
					<div className="control-block-button">
						<a href="#" className="btn btn-control bg-blue">
							<FaRegGrinBeam />
						</a>
						<a href="#" className="btn btn-control bg-purple">
							<FaRegEnvelope />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FriendCard;
