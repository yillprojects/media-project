import React, { Component } from "react";

<<<<<<< HEAD
import UserInfo from "./components/UserInfo.js";
import "./aboutUser.scss";

const AboutUser = () => {
	return [<UserInfo />];
=======
import _map from "lodash/map";

import { FaFacebookF, FaTwitter, FaDribbble } from "react-icons/fa";
import "./aboutUser.scss";

const AboutUser = () => {
	const titles = [
		{
			key: "aboutUser",
			title: "About me"
		},
		{
			key: "birthday",
			title: "Birthday"
		},
		{
			key: "birthplace",
			title: "Birthplace"
		},
		{
			key: "livesIn",
			title: "Lives in"
		},
		{
			key: "occupation",
			title: "Occupation"
		},
		{
			key: "joined",
			title: "Joined"
		},
		{
			key: "gender",
			title: "Gender"
		},
		{
			key: "status",
			title: "Status"
		},
		{
			key: "email",
			title: "Email"
		},
		{
			key: "website",
			title: "Website"
		},
		{
			key: "phone",
			title: "Phone Number"
		},
		{
			key: "religion",
			title: "Religious Beliefs"
		}
	];

	const data = {
		aboutUser:
			"Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56",
		birthday: "December 14th, 1980",
		birthplace: "Austin, Texas, USA",
		livesIn: "San Francisco, California, USA",
		occupation: "UI/UX Designer",
		joined: "April 31st, 2014",
		gender: "Male",
		status: "Married",
		email: "jspiegel@yourmail.com",
		website: "daydreamsagency.com",
		phone: "(044) 555 - 4369 - 8957",
		religion: "-"
	};

	return [
		<div className="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
			<div className="about-user ui-block">
				<div className="ui-block-title">
					<h6 className="title">Personal Info</h6>
				</div>
				<div className="ui-block-content">
					<ul className="widget w-personal-info">
						{_map(titles, (item, index) => (
							<li key={item.key}>
								<span className="title">{item.title}: </span>
								{item.title === "Website" || item.title === "Email" ? (
									<a href="#" className="text">
										{data[item.key]}
									</a>
								) : (
									<span className="text">{data[item.key]}</span>
								)}
							</li>
						))}
					</ul>
					<div className="w-socials">
						<h6 className="title">Other Social Networks: </h6>
						<a href="#" className="social-item bg-facebook">
							<FaFacebookF className="mr-1" /> Facebook
						</a>
						<a href="#" className="social-item bg-twitter">
							<FaTwitter className="mr-1" /> Twitter
						</a>
						<a href="#" className="social-item bg-dribbble">
							<FaDribbble className="mr-1" /> Dribbble
						</a>
					</div>
				</div>
			</div>
		</div>
	];
>>>>>>> 8fc60dd... started aboutUser page
};

export default AboutUser;
