import React, { Component } from "react";

import { UncontrolledTooltip, Button } from "reactstrap";

import _map from "lodash/map";
import { FaRegStar, FaStar } from "react-icons/fa";

import PageImg from "./../../../../img/35.png";

class PageItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isHoverOn: false
		};
	}

	render() {
		const { data } = this.props;
		const { isHoverOn } = this.state;

		return (
			<div className="post-author">
				<div className="user-title">
					<div className="author-thumb">
						<img
							src={data.img}
							alt="favourite-page-img"
							style={{ height: 35, width: 35 }}
						/>
					</div>
					<div className="notification-event">
						<h6 className="title">
							<a href="#">{data.title}</a>
						</h6>
						<span className="chat-message-item">{data.type}</span>
					</div>
				</div>
				<div className="notification-icon">
					<Tooltip title="ADD TO YOUR FAVS" placement="top"	>
						<Button
							type="button"
							className="transparent-btn"
							onMouseOver={this.onMouseEnter}
							onMouseLeave={this.onMouseLeave}
							id={"tooltip-" + data.id}
						>
							{1 == 2 ? <FaStar style={{ color: "#ffc923" }} /> : <FaRegStar />}
							<span className="sr-only">Add to saved posts</span>
						</Button>
					</Tooltip>
				</div>
			</div>
		);
	}
}

const data = [
	{
		id: 1,
		img: PageImg,
		title: "The Marina Bar",
		type: "Restaurant / Bar"
	},
	{
		id: 2,
		img: PageImg,
		title: "Tapronus Rock",
		type: "Rock Band"
	},
	{
		id: 3,
		img: PageImg,
		title: "Pixel Digital Design",
		type: "Company"
	}
];

export default class FavouritePages extends Component {
	render() {
		return (
			<div className="ui-block">
				<div className="ui-block-title">
					<h5 className="title">Favourite Pages</h5>
				</div>
				<ul className="widget w-favourite-pages">
					{_map(data, item => {
						return (
							<li key={item.id}>
								<PageItem data={item} />
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
