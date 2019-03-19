import React, { Component } from "react";

import { Button } from "reactstrap";
import { FaSearch, FaTimes } from "react-icons/fa";

class SearchMobile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSearchOpen: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	toggle() {

		this.setState({
			isSearchOpen: !this.state.isSearchOpen
		})
	}

	render() {
		const { isSearchOpen } = this.state;

		return (
			<div>
				 <Button className="search-bar-btn" onClick={() => this.toggle()}>
          { isSearchOpen ? 
          <FaTimes /> : <FaSearch /> }
        </Button>
			</div>
		);
	}
}

export default SearchMobile;