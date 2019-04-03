import React, { Component } from "react";

import _map from "lodash/map";

import Post from "./components/post/Post.js";
import ProfileInfo from "./components/ProfileInfo.js";

const amount = [1, 2, 3, 4];

const ProfileTimeline = () => {
	return [
		<div className="col-3">
			<ProfileInfo />
			<a
				className="twitter-timeline ui-block"
				data-width="300"
				data-height="300"
				data-theme="light"
				href="https://twitter.com/flesh_wa?ref_src=twsrc%5Etfw"
			>
				Tweets by flesh_wa
			</a>
		</div>,

		<div className="col-6">
			{_map(amount, i => (
				<Post key={i} />
			))}
		</div>
	];
};

export default ProfileTimeline;
