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
		const id = localStorage.getItem("currentUserId");
		const axios = client(token);

		axios.get("api/countries").then(res => {
			const options = [];
			res.data.data.map(country => options.push({ label: country.name, id: country.id }));

			if (this._isMounted) {
				this.setState({
					countries: options
				});
			}
		});

		axios
			.post(`api/profiles/${id}/get_fields`, {
				fields: [
					"first_name",
					"last_name",
					"email",
					"website",
					"location",
					"about",
					"shows",
					"bands",
					"facebook",
					"twitter",
					"dribbble"
				]
			})
			.then(res => {
				console.log('received data', res.data.data.location);

				if (this._isMounted) {
					const options = res.data.data;

					Object.keys(options).map(key =>
						this.setState({
							[key]: options[key]
						})
					);

					if (options.location.country) {
						const { name, id } = options.location.country;

						this.setState({
							selectedCountry: {
								label: name,
								id
							}
						});

						axios
							.post('api/cities', {
								country: id
							})
							.then(res => {
								const options = [];
								res.data.data.map(city => options.push({ label: city.name, id: city.id }));

								if (this._isMounted) {
									this.setState({
										cities: options
									});
								}
							});

						if (options.location.city) {
							const { name, id } = options.location.city;

							this.setState({
								selectedCity: {
									label: name,
									id
								}
							});
						}
					}
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleSubmit(event) {
		event.preventDefault();

		const labels = [
			"firstName",
			"lastName",
			"email",
			"website",
			"personInfo",
			"personShows",
			"personMusic",
			"facebook",
			"twitter",
			"dribbble"
		];
		const names = [
			"first_name",
			"last_name",
			"email",
			"website",
			"about",
			"shows",
			"bands",
			"facebook",
			"twitter",
			"dribbble"
		];
		let data = {};

		for (let i = 0; i < names.length; i++) {
				data[names[i]] = this.state[names[i]];
		}
		console.log('data', data);

		const { selectedCity, selectedCountry } = this.state;

		const token = localStorage.getItem("token");
		const id = localStorage.getItem("currentUserId");
		const axios = client(token);


		axios.patch(`api/profiles/${id}`, data).then(res => console.log('patch', res.data));

		if (selectedCountry) {
			let data = {
				country: selectedCountry.id
			};

			if (selectedCity) {
				data.city = selectedCity.id
			}

			axios
				.post(`api/profiles/${id}/set_location`, data)
				.then(res => console.log('location', res.data.data));
		}
	}

	handleChangeCountry(selectedCountry) {
		this.setState({ selectedCountry });

		const token = localStorage.getItem("token");
		const axios = client(token);

		axios.post("api/cities", { country: selectedCountry.id }).then(res => {
			const options = [];
			res.data.data.map(city => options.push({ label: city.name, id: city.id }));

			this.setState({
				cities: options,
				selectedCity: null
			});
		});
	}

	handleChangeCity(selectedCity) {
		// console.log(selectedCity);
		this.setState({ selectedCity });
	}

	handleInputChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	handleTextareaChange = event => {
		const { name, value } = event.target;
	};

	render() {
		const {
			countries,
			cities,
			selectedCountry,
			selectedCity,
			first_name,
			last_name,
			email,
			website,
			about,
			shows,
			bands,
			facebook,
			twitter,
			dribbble
		} = this.state;
		// console.log(this.state);

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
													name="first_name"
													id="settings-first-name"
													placeholder="First Name"
													onChange={this.handleInputChange}
													defaultValue={first_name}
												/>
												<Label for="settings-first-name">First Name</Label>
											</FormGroup>
											<FormGroup className="form-label-group">
												<Input
													name="email"
													id="settings-email"
													placeholder="Your Email"
													onChange={this.handleInputChange}
													defaultValue={email}
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
													name="last_name"
													id="settings-last-name"
													placeholder="Last Name"
													onChange={this.handleInputChange}
													defaultValue={last_name}
												/>
												<Label for="settings-last-name">Last Name</Label>
											</FormGroup>
											<FormGroup className="form-label-group">
												<Input
													name="website"
													id="settings-website"
													placeholder="Your Website"
													onChange={this.handleInputChange}
													defaultValue={website}
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
													name="about"
													id="personal-info"
													rows={8}
													onChange={this.handleInputChange}
													value={about}
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
													name="shows"
													id="tv-shows"
													rows={3}
													onChange={this.handleInputChange}
													value={shows}
												/>
											</FormGroup>
											<FormGroup>
												<Label for="music-bands" className="personal-label">
													Write about your favourite music bands
												</Label>
												<Input
													type="textarea"
													name="bands"
													id="music-bands"
													rows={3}
													onChange={this.handleInputChange}
													value={bands}
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
													defaultValue={facebook}
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
													defaultValue={twitter}
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
													defaultValue={dribbble}
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
