import React, { Component } from "react";

import _map from "lodash/map";

import User from "./../../../../img/35.png";
import "./friendsList.scss";

const Friend = props => {
	return (
		<li>
			<a href="#" alt="friend-img" className="w-friends-link">
				<img src={props.img} alt="author" style={{ heigh: 35, width: 35 }} />
			</a>
		</li>
	);
};

const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default class FriendsList extends Component {
	render() {
		return (
			<div className="ui-block">
				<div className="ui-block-title">
					<h5 className="title">Friends ({amount.length})</h5>
				</div>
				<div className="ui-block-content">
					<ul className="widget w-friends">
						{_map(amount, i => (i <= 14 ? <Friend img={User} key={i} /> : ""))}
						{amount.length > 14 ? (
							<li className="all-users">
								<a href="#">+{amount.length - 14}</a>
							</li>
						) : (
							""
						)}
					</ul>
				</div>
			</div>
		);
	}
}
