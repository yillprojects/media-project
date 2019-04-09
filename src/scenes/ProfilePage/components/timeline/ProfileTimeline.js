import React, { Component } from "react";
import Media from "react-media";

import _map from "lodash/map";

import Post from "./components/post/Post.js";
import ProfileInfo from "./components/profileInfo/ProfileInfo.js";
import FriendsList from "./components/friendsList/FriendsList.js";
import FavouritePages from "./components/favouritePages/FavouritePages.js";

import "./profileTimeline.scss";

const amount = [1, 2, 3, 4];

const ProfileTimeline = () => {
	return (
		<Media query="(min-width: 1200px)">
			{match1 =>
				match1 ? (
					[
						<div className=" col col-3">
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
						<div className="col col-6">
							{_map(amount, i => (
								<Post key={i} />
							))}
						</div>,
						<div className="col col-3">
							<FriendsList />
							<FavouritePages />
						</div>
					]
				) : (
					<Media query="(max-width: 768px)">
						{match2 =>
							match2 ? (
								<div className="col col-12">
									{_map(amount, i => (
										<Post key={i} />
									))}
								</div>
							) : (
								[
									<div className="col col-6">
										{_map(amount, i => (
											<Post key={i} />
										))}
									</div>,
									<div className="col col-6">
										<ProfileInfo />
										<FriendsList />
										<FavouritePages />
									</div>
								]
							)
						}
					</Media>
				)
			}
		</Media>
	);
};

export default ProfileTimeline;
