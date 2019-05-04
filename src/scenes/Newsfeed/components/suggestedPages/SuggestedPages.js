import React, { Component } from "react";
import _map from "lodash/map";

import PageItem from 'components/favouritePages/PageItem.js';


const data = [
	{
		id: 1,
		img: 'https://via.placeholder.com/35',
		title: "The Marina Bar",
		type: "Restaurant / Bar"
	},
	{
		id: 2,
		img: 'https://via.placeholder.com/35',
		title: "Tapronus Rock",
		type: "Rock Band"
	},
	{
		id: 3,
		img: 'https://via.placeholder.com/35',
		title: "Pixel Digital Design",
		type: "Company"
	}
];

export default class SuggestedPages extends Component {
	render() {
		return (
			<div className="ui-block">
				<div className="ui-block-title">
					<h5 className="title">Pages You May Like</h5>
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
