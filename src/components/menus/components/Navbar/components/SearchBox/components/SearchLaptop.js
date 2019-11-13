import React, { Component } from 'react';

import {
  Button, Form, Input, Label
} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';

import Suggestions from './Suggestions.js';

class SearchLaptop extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.state = {
      focused: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  handleClick = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        focused: false
      })
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handlePageLeft = () => {
    this.setState({
      focused: false
    })
  };

  render() {
    const { focused } = this.state;
    const { query, handleInputChange, results } = this.props;

    return (
      <div ref={this.container} style={{ width: "inherit" }}>
        <Form
          className="search-bar w-search"
          autoComplete="off"
          onSubmit={this.handleSubmit}
          onFocus={this.onFocus}
        >
            <Input
              name="search-box"
              id="search-box"
              placeholder="Search for..."
              onChange={handleInputChange}
              className="search-bar-input with-button"
            />
            <Label for="search-box" className="sr-only">
              Search
            </Label>
            <Button className="search-bar-btn">
              <FaSearch />
            </Button>
            {(query && focused) ? <Suggestions results={results} handlePageLeft={this.handlePageLeft} /> : ''}
        </Form>
      </div>
    );
  }
}

export default SearchLaptop;
