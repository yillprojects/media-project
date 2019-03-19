import React, { Component } from "react";

import { Button, Form, Input, Label } from "reactstrap";
import { FaSearch } from "react-icons/fa";

class SearchLaptop extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { handleInputChange } = this.props;

    return (
      <Form
        className="search-bar w-search"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Input
          name="search-box"
          id="search-box"
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={handleInputChange}
          className="search-bar-input with-button"
        />
        <Label for="search-box" className="sr-only">
          Search
        </Label>
        <Button className="search-bar-btn">
          <FaSearch />
        </Button>
      </Form>
    );
  }
}

export default SearchLaptop;