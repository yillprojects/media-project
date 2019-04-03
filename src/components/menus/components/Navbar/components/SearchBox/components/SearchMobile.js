import React, { Component } from 'react';

import { Button, Input, Form } from 'reactstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

import Suggestions from './Suggestions.js';

class SearchMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchOpen: false,
      focused: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  toggle() {
    this.setState({
      isSearchOpen: !this.state.isSearchOpen
    });
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
    const { isSearchOpen, focused } = this.state;
    const { query, handleInputChange, results } = this.props;

    return (
      <div className={`m-search ${isSearchOpen ? 'open' : ''}`}>
        <Button className="search-bar-btn" onClick={() => this.toggle()}>
          {isSearchOpen ? <FaTimes /> : <FaSearch />}
        </Button>
        {isSearchOpen ? (
          <div className="mobile-search-box">
            <Form
              className="search-bar"
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
                className="search-bar-input with-button mobile-search"
              />
              {(query && focused) ? <Suggestions results={results} /> : ''}
            </Form>
          </div>
        ) : (
				  ''
        )}
      </div>
    );
  }
}

export default SearchMobile;
