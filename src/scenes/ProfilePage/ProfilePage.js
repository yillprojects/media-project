import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';
import axios from 'axios';
import AboutUser from './components/about/AboutUser.js';

class ProfilePage extends Component {
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
