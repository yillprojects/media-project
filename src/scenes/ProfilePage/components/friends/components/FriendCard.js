import React from "react";

import { FaRegGrinBeam, FaRegEnvelope } from "react-icons/fa";

import "./friendCard.scss";

const FriendCard = props => {
	const { data } = props;

	return (
		<div className="ui-block">
			<div className="friend-item">
				<div className="friend-header-thumb">
					<img src={data.thumb} alt="friend" />
				</div>
				<div className="friend-item-content">
					<div className="friend-avatar">
						<div className="author-thumb">
							<img
								src={data.avatar}
								alt="author"
								style={{ height: 92, width: 92 }}
							/>
						</div>
						<div className="author-content">
							<h5 className="title">
								<a href="#" className="author-name">
									{data.author}
								</a>
							</h5>
							<div className="country">{data.country}</div>
						</div>
					</div>
					<div className="friend-count">
						<a href="#" className="friend-count-item">
							<p className="count-number">{data.friends}</p> Friends
						</a>
						<a href="#" className="friend-count-item">
							<p className="count-number">{data.photos}</p> Photos
						</a>
						<a href="#" className="friend-count-item">
							<p className="count-number">{data.videos}</p> Videos
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
