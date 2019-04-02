import React, { Component } from "react";

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';

class ProfilePage extends Component {
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
