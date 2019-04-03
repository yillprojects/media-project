import React from "react";
import { Link } from "react-router-dom";

import ProfileMenu from "./components/ProfileMenu.js";

import TopHeader from "./../../img/top-header1.jpg";
import User from "./../../img/author-main1.jpg";

import "./profileheader.scss";

const ProfileHeader = () => {
	return (
		<div className="col col-12">
			<div className="ui-block">
				<div className="top-header">
					<div className="top-header-thumb">
						<img src={TopHeader} alt="user-header" />
					</div>
					<ProfileMenu />
					<div className="top-header-author">
						<Link to="/user" className="author-thumb">
							<img
								src={User}
								alt="user-img"
								style={{ height: 124, width: 124 }}
							/>
						</Link>
						<div className="author-content">
							<Link to="/user" className="author-name">
								<h4>James Spiegel</h4>
							</Link>
							<span className="country">San Francisco, CA</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
