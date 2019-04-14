import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';
import axios from 'axios';
import AboutUser from './components/about/AboutUser.js';

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
					<Route path='/user/timeline' component={ProfileTimeline} />
					<Route path='/user/about' component={AboutUser} />
				</div>
			</div>
		);
	}
}

export default ProfilePage;
