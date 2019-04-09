import React, { Component } from "react";

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';
import axios from 'axios';

class ProfilePage extends Component {
	componentDidMount() {
		axios
		.post("http://localhost:8000/api/", {username: '1112', password: '23asdasd22', appointment: 'check'})
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="container">
				<div className="mt-4 row">
					<ProfileHeader />
					<ProfileTimeline />
				</div>
			</div>
		);
	}
}

export default ProfilePage;
