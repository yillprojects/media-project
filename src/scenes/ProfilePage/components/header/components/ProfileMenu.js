import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "redux/actions/index.js";

import ProfileControlButtons from "./control buttons/ProfileControlButtons.js";

import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FaEllipsisH } from "react-icons/fa";

import "./profilemenu.scss";

class ProfileMenu extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.changeActiveTab = this.changeActiveTab.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		this.state = {
			dropdownOpen: false,
			activeTab: "1"
		};
	}

	componentWillMount() {
		const { userTab } = this.props;

		this.setState({
			activeTab: userTab
		});

		const { dispatch } = this.props;
		dispatch(userActions.currentPage("2"));
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			activeTab: nextProps.userTab
		});
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	onMouseEnter() {
		this.setState({ dropdownOpen: true });
	}

	onMouseLeave() {
		this.setState({ dropdownOpen: false });
	}

	changeActiveTab(tab) {
		const { activeTab } = this.state;

		if (activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}

		const { dispatch } = this.props;
		dispatch(userActions.currentProfileTab(tab));
	}

	render() {
		const { dropdownOpen, activeTab } = this.state;
		return (
			<div className="profile-section">
				<div className="row">
					<div className="col col-lg-5 col-md-5 col-sm-12 col-12">
						<ul className="profile-menu menu-position">
							<li className="list-item">
								<Link
									to="/user/timeline"
									className={`profile-menu-link ${
										activeTab === "1" ? "active" : ""
									}`}
									onClick={() => {
										this.changeActiveTab("1");
									}}
								>
									Timeline
								</Link>
							</li>
							<li className="list-item">
								<Link
									to="/user/about"
									className={`profile-menu-link ${
										activeTab === "2" ? "active" : ""
									}`}
									onClick={() => {
										this.changeActiveTab("2");
									}}
								>
									About
								</Link>
							</li>
						</ul>
					</div>
					<div className="col col-lg-5 col-md-5 col-sm-12 col-12 ml-auto">
						<ul className="profile-menu">
							<li className="list-item">
								<Link
									to="/user/friends"
									className={`profile-menu-link ${
										activeTab === "3" ? "active" : ""
									}`}
									onClick={() => {
										this.changeActiveTab("3");
									}}
								>
									Friends
								</Link>
							</li>
							<li className="list-item">
								<div className="more">
									<Dropdown
										onMouseOver={this.onMouseEnter}
										onMouseLeave={this.onMouseLeave}
										isOpen={dropdownOpen}
										toggle={this.toggle}
									>
										<DropdownToggle className="transparent-btn">
											<FaEllipsisH />
										</DropdownToggle>
										<DropdownMenu right>
											<ul className="more-options">
												<li>
													<a href="#" className="profile-menu-link">
														Report Profile
													</a>
												</li>
												<li>
													<a href="#" className="profile-menu-link">
														Block Profile
													</a>
												</li>
											</ul>
										</DropdownMenu>
									</Dropdown>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<ProfileControlButtons />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { userTab } = state.direction;
	return {
		userTab
	};
};

export default connect(mapStateToProps)(ProfileMenu);
