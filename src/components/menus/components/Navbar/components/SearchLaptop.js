import React, { Component } from "react";

import { Button, Form, Input, Label } from "reactstrap";
import { FaSearch } from "react-icons/fa";

import Suggestions from "./components/Suggestions.js";

class SearchLaptop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  onBlur() {
    this.setState({
      focused: false
    });
  }

  render() {
    const { focused } = this.state;
    const { query, handleInputChange, results } = this.props;

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
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className="search-bar-input with-button"
        />
        <Label for="search-box" className="sr-only">
          Search
        </Label>
        <Button className="search-bar-btn">
          <FaSearch />
        </Button>
        {(query && focused) ? <Suggestions results={results} /> : ""}
      </Form>
    );
  }
}

export default SearchLaptop;
