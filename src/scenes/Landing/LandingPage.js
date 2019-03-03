import React, { Component } from 'react';

import SignUp from './SignUp/SignUp.js';

import './landing.scss';

export default class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return(
			<div className="landing-page">
				<div className="bg-wrap">
					<div className="landing-page-wrap">
						<div className="container">
							<div className="row align-items-center">
								<div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
									<div className="landing-content">
										<h1 className="landing-content-title">Welcome to the Biggest Social Network in the World</h1>
										<p>We are the best and biggest social network with 5 billion active users all around the world. Share you
													thoughts, write blog posts, show your favourite music via Stopify, earn badges and much more!</p>
									</div>
								</div>
								<div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
									<SignUp />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};