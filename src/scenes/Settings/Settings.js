import React, { Component } from "react";
import Prompt from "react-router/Prompt";
import PersonalSettings from './components/PersonalSettings.js';

import Background from "./img/account-bottom.png";
import './settings.scss';


class Settings extends Component {
	constructor(props) {
		super(props);

		this.unsavedChanges = false;
	}

	render() {
		return (
			<React.Fragment>
				<div className="main-header">
					<div className="content-bg-wrap bg-account" />
					<div className="container">
						<div className="row">
							<div className="col col-lg-8 m-auto col-md-8 col-sm-12 col-12">
								<div className="main-header-content">
									<h1>Your Account Dashboard</h1>
									<p>
										Welcome to your account dashboard! Here you’ll find
										everything you need to change your profile information,
										settings, read notifications and requests, view your latest
										messages, change your pasword and much more! Also you can
										create or manage your own favourite page, have fun!
									</p>
								</div>
							</div>
						</div>
					</div>
					<img src={Background} alt="background-img" className="img-bottom" />
				</div>
				<PersonalSettings />
			</React.Fragment>
		);
	}
}

export default Settings;
