import React, { Component } from "react";

import _map from "lodash/map";

import Post from "./components/post/Post.js";
import ProfileInfo from "./components/profileInfo/ProfileInfo.js";
import FriendsList from './components/friendsList/FriendsList.js';
import FavouritePages from './components/favouritePages/FavouritePages.js';

import "./profileTimeline.scss";

const amount = [1, 2, 3, 4];

const ProfileTimeline = () => {
	return [
		<div className="col-3">
			<ProfileInfo />
			<a
				className="twitter-timeline ui-block"
				data-theme="light"
				data-tweet-limit="3"
				data-link-color="#E95F28"
				href="https://twitter.com/dan_abramov?ref_src=twsrc%5Etfw"
			>
				Tweets by dan_abramov
			</a>
		</div>,
		<div className="col-6">
			{_map(amount, i => (
				<Post key={i} />
			))}
		</div>,
		<div className="col-3">
			<FriendsList />
			<FavouritePages />
		</div>
	];
};

export default ProfileTimeline;
