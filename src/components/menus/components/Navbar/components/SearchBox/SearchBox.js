import React, { Component } from 'react';
import client from 'axiosClient';

import SearchMobile from './components/SearchMobile.js';
import SearchLaptop from './components/SearchLaptop.js';

import './searchbox.scss';

class SearchBox extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      query: '',
      results: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(event) {
    const { value } = event.target;
    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
        .post('api/profiles/search', {
          query: value,
        })
        .then(res => {
          this.setState({
            query: value,
            results: res.data.data,
          })
        });
  }

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-wrap">
        <SearchLaptop
          handleInputChange={this.handleInputChange}
          query={query}
          results={results}
        />
        <SearchMobile
          handleInputChange={this.handleInputChange}
          query={query}
          results={results}
        />
      </div>
    );
  }
}

export default SearchBox;
