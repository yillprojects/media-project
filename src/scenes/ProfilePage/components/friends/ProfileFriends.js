import React, { Component } from "react";
import _map from "lodash/map";

import { FaEllipsisH } from "react-icons/fa";

import FriendCard from "./components/FriendCard.js";
import Thumb from "./components/img/thumb.jpg";
import Avatar from "./components/img/avatar.jpg";

import "./profileFriends.scss";
import client from "../../../../axiosClient";

const friends = [
	{
		id: 1,
		thumb: Thumb,
		avatar: Avatar,
		author: "Nicholas Grissom",
		country: "San Francisco, CA",
		friends: 52,
		photos: 240,
		videos: 16
	}
];

class ProfileFriends extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			friendsData: [],
			name: ''
		}
	}

	loadData = () => {
		const token = localStorage.getItem('token');
        const { userId } = this.props;
        const axios = client(token);

        axios
			.get(`api/profiles/${userId}/friends`)
			.then(res => {
				if (this._isMounted) {
					this.setState({
						friendsData: res.data.data
					})
				}
			});
        axios
			.post(`api/profiles/${userId}/get_fields`, {
				fields: ['first_name']
			})
			.then(res => {
				if (this._isMounted) {
					this.setState({
						name: res.data.data.first_name
					})
				}
			});
	};

	componentDidMount() {
		this._isMounted = true;
		this.loadData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.userId !== prevProps.userId) {
			this.loadData();
		}
	}

	render() {
		const { friendsData, name } = this.state;

		return (
			<React.Fragment>
				<div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="ui-block responsive-flex">
						<div className="ui-block-title">
							<h6 className="title">{name}'s Friends ({friendsData.length})</h6>
							<FaEllipsisH />
						</div>
					</div>
				</div>
				{
					friendsData.length === 0 ? '' : (
						_map(friendsData, friend => (
							<div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12" key={friend.id}>
								<FriendCard data={friend} />
							</div>
						))
					)
				}
			</React.Fragment>
		);
	}
}

export default ProfileFriends;
