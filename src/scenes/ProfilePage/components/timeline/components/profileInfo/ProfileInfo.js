import React from "react";

import { FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";

import "./profileInfo.scss";

const ProfileInfo = () => {
	return (
		<div className="personal-info ui-block">
			<div className="ui-block-title">
				<h5 className="title">Profile Intro</h5>
			</div>
			<div className="ui-block-content">
				<ul className="w-personal-info mb-4">
					<li>
						<h6 className="title">About Me:</h6>
						<p className="text">
							Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit
							anim id est laborum.
						</p>
					</li>
					<li>
						<h6 className="title">Favorite TV Shows:</h6>
						<p className="text">
							Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit
							anim id est laborum.
						</p>
					</li>
					<li>
						<h6 className="title">Favourite Music Bands/Artists:</h6>
						<p className="text">
							Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit
							anim id est laborum.
						</p>
					</li>
				</ul>
				<div className="w-socials">
					<h6 className="title">Other Social Networks: </h6>
					<a href="#" className="social-item bg-facebook">
						<FaFacebookF className="mr-1" /> Facebook
					</a>
					<a href="#" className="social-item bg-twitter">
						<FaTwitter className="mr-1" /> Twitter
					</a>
					<a href="#" className="social-item bg-dribbble">
						<FaDribbble className="mr-1" /> Dribbble
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
