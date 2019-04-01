import React, { Component } from "react";

import ProfileHeader from './components/header/ProfileHeader.js';

class ProfilePage extends Component {
	render() {
		return (
			<div className="container">
				<div className="mt-4 row">
					<ProfileHeader />
				</div>
			</div>
		);
	}
}

export default ProfilePage;
