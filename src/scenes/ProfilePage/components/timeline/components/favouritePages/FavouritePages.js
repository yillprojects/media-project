import React, { Component } from "react";

import _map from "lodash/map";

const PageItem = () => {
	return (
		<li>
			
		</li>
	);
}

const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default class FavouritePages extends Component {
	render() {
		return (
			<div className="ui-block">
				<div className="ui-block-title">
					<h5 className="title">Favourite Pages</h5>
				</div>
				<ul className="widget w-favourite-pages">
					
				</ul>
			</div>
		);
	}
}
