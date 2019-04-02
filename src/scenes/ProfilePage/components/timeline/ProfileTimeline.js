import React, { Component } from "react";

import _map from "lodash/map";

import Post from "./components/Post.js";
const amount = [1, 2, 3, 4];

const ProfileTimeline = () => {
	return (
		<div className="col col-12">
			{_map(amount, i => (
				<Post key={i} />
			))}
		</div>
	);
};

export default ProfileTimeline;
