import React, { Component } from 'react';

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
							<div className="row">
								<div className="col col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
									<div className="landing-content">
										<h1 className="landing-content-title">Welcome to the Biggest Social Network in the World</h1>
										<p>We are the best and biggest social network with 5 billion active users all around the world. Share you
													thoughts, write blog posts, show your favourite music via Stopify, earn badges and much more!</p>
									</div>
								</div>
								<div className="col col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};