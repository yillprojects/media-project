import React from "react";

import ProfileMenu from "./components/menu/ProfileMenu.js";

import TopHeader from "./../../img/top-header1.jpg";
import './profileheader.scss';

const ProfileHeader = () => {
	return (
		<div className="col col-12">
			<div className="ui-block">
				<div className="top-header">
					<div className="top-header-thumb">
						<img src={TopHeader} alt="user-header" />
					</div>
					<ProfileMenu />
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;