import React, { Component } from "react";
import client from "../../../axiosClient.js";

import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
	InputGroupAddon
} from "reactstrap";
import Select from "react-select";

import { FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";

import "./personalSettings.scss";

class PersonalSettings extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			countries: [],
			cities: [],
			selectedCountry: null,
			selectedCity: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeCountry = this.handleChangeCountry.bind(this);
		this.handleChangeCity = this.handleChangeCity.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		const token = localStorage.getItem("token");
		const axios = client(token);

		axios.get("api/countries").then(res => {
			const options = [];
			res.data.data.map(country => options.push({ label: country }));

			if (this._isMounted) {
				this.setState({
					countries: options
				});
			}
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
	}

	handleChangeCountry(selectedCountry) {
		this.setState({ selectedCountry });

		const token = localStorage.getItem("token");
		const axios = client(token);

		axios.post("api/cities", { country: selectedCountry.label }).then(res => {
			const options = [];
			res.data.data.map(city => options.push({ label: city }));

			this.setState({
				cities: options,
				selectedCity: null
			});
		});
	}

	handleChangeCity(selectedCity) {
		console.log(selectedCity);
		this.setState({ selectedCity });
	}

	handleInputChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		})
	};

	render() {
		const { selectedCountry, selectedCity, countries, cities } = this.state;
		console.log(
			"selected",
			this.state.selectedCountry,
			this.state.selectedCity
		);

		return (
			<div className="container">
				<div className="row">
					<div className="col col-12 personal-settings">
						<div className="ui-block">
							<div className="ui-block-title">
								<h6 className="title">Personal Information</h6>
							</div>
							<div className="ui-block-content">
								<Form onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
											<FormGroup className="form-label-group">
												<Input
													name="firstName"
													id="settings-first-name"
													placeholder="First Name"
													onChange={this.handleInputChange}
												/>
												<Label for="settings-first-name">First Name</Label>
											</FormGroup>
											<FormGroup className="form-label-group">
												<Input
													name="email"
													id="settings-email"
													placeholder="Your Email"
													onChange={this.handleInputChange}
												/>
												<Label for="settings-email">Your Email</Label>
											</FormGroup>
											<Select
												value={selectedCountry}
												onChange={this.handleChangeCountry}
												options={countries}
												placeholder="Your Country"
											/>
										</div>
										<div className="col col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
											<FormGroup className="form-label-group">
												<Input
													name="lastName"
													id="settings-last-name"
													placeholder="Last Name"
													onChange={this.handleInputChange}
												/>
												<Label for="settings-last-name">Last Name</Label>
											</FormGroup>
											<FormGroup className="form-label-group">
												<Input
													name="website"
													id="settings-website"
													placeholder="Your Website"
												/>
												<Label for="settings-website">Your Website</Label>
											</FormGroup>
											<Select
												value={selectedCity}
												onChange={this.handleChangeCity}
												options={cities}
												placeholder="Your City"
											/>
										</div>
										<div className="col col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
											<FormGroup>
												<Label for="personal-info" className="personal-label">
													Write a little description about yourself
												</Label>
												<Input
													type="textarea"
													name="personInfo"
													id="personal-info"
													rows={8}
												/>
											</FormGroup>
										</div>
										<div className="col col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
											<FormGroup className="custom-form">
												<Label for="tv-shows" className="personal-label">
													Write about your favourite TV shows
												</Label>
												<Input
													type="textarea"
													name="personShows"
													id="tv-shows"
													rows={3}
													onChange={this.handleInputChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label for="music-bands" className="personal-label">
													Write about your favourite music bands
												</Label>
												<Input
													type="textarea"
													name="personMusic"
													id="music-bands"
													rows={3}
													onChange={this.handleInputChange}
												/>
											</FormGroup>
										</div>
										<div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<InputGroup className="mb-3">
												<InputGroupAddon
													addonType="prepend"
													className="icon-facebook"
												>
													<FaFacebookF />
												</InputGroupAddon>
												<Input
													placeholder="Your Facebook Account"
													name="facebook"
													onChange={this.handleInputChange}
												/>
											</InputGroup>
											<InputGroup className="mb-3">
												<InputGroupAddon
													addonType="prepend"
													className="icon-twitter"
												>
													<FaTwitter />
												</InputGroupAddon>
												<Input
													placeholder="Your Twitter Account"
													name="twitter"
													onChange={this.handleInputChange}
												/>
											</InputGroup>
											<InputGroup className="mb-3">
												<InputGroupAddon
													addonType="prepend"
													className="icon-dribbble"
												>
													<FaDribbble />
												</InputGroupAddon>
												<Input
													placeholder="Your Dribbble Account"
													name="dribbble"
													onChange={this.handleInputChange}
												/>
											</InputGroup>
										</div>
									</div>
									<div className="col col-12 button-control">
										<button
											type="submit"
											className="btn btn-primary btn-lg full-width"
										>
											Save all Changes
										</button>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PersonalSettings;
