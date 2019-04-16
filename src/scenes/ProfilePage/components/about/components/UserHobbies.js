import React, { Component } from "react";

import _map from "lodash/map";

const titles = [
	{
		key: "hobbies",
		title: "Hobbies"
	},
	{
		key: "favTV",
		title: "Favourite TV Shows"
	},
	{
		key: "favMovies",
		title: "Favourite Movies"
	},
	{
		key: "favGames",
		title: "Favourite Games"
	},
	{
		key: "favMusic",
		title: "Favourite Music Bands/Artist"
	},
	{
		key: "favBooks",
		title: "Favourite Books"
	},
	{
		key: "favWritters",
		title: "Favourite Writters"
	},
	{
		key: "interests",
		title: "Other interests"
	}
];

const data = {
	hobbies:
		"I like to ride the bike to work, swimming, and working out. I also like reading design magazines, go to museums, and binge watching a good tv show while it’s raining outside.",
	favTV:
		"Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.",
	favMovies:
		"Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad, Ferrum Man.",
	favGames:
		"The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch Auto.",
	favMusic:
		"Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.",
	favBooks:
		"The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water.",
	favWritters:
		"Martin T. Georgeston, Jhonathan R. Token, Ivana Rowle, Alexandria Platt, Marcus Roth.",
	interests:
		"Swimming, Surfing, Scuba Diving, Anime, Photography, Tattoos, Street Art."
};

const UserHobbies = () => {
	return (
		<div className="ui-block">
			<div className="ui-block-title">
				<h6 className="title">Hobbies and Interests</h6>
			</div>
			<div className="ui-block-content">
				<div className="row">
					<div className="col col-lg-6 col-md-6 col-sm-12 col-12">
						<ul className="widget w-personal-info">
							{_map(titles, (item, index) =>
								index < 4 ? (
									<li key={item.key}>
										<p className="title">{item.title}: </p>
										<span className="text">{data[item.key]}</span>
									</li>
								) : (
									""
								)
							)}
						</ul>
					</div>
					<div className="col col-lg-6 col-md-6 col-sm-12 col-12">
						<ul className="widget w-personal-info">
							{_map(titles, (item, index) =>
								index >= 4 ? (
									<li key={item.key}>
										<p className="title">{item.title}: </p>
										<span className="text">{data[item.key]}</span>
									</li>
								) : (
									""
								)
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserHobbies;
