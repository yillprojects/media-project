import React, { Component } from 'react';
import client from 'axiosClient';

import SearchMobile from './components/SearchMobile.js';
import SearchLaptop from './components/SearchLaptop.js';
import Suggestions from './components/Suggestions.js';

import './searchbox.scss';

class SearchBox extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      query: '',
      info: [],
      results: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const token = localStorage.getItem('token');
    const axios = client(token);

    axios.get('api/profiles').then(res => {
      if (this._isMounted) {
        console.log(res)
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(event) {
    const { value } = event.target;
    this.setState(
      {
        query: value
      },
      () => {
        const { query, info } = this.state;

        if (query && query.length > 1) {
          const filteredData = info.filter((item) => {
            const options = [item.username];
            let isItemFound = 'notfound';

            options.map((data) => {
              if (data.toLowerCase().includes(query)) {
                isItemFound = 'found';
              }
            });

            return isItemFound == 'found' ? item : '';
          });

          this.setState({
            results: filteredData
          });
        }
      }
    );
  }

  render() {
    const { query, results } = this.state;
    console.log(this.state.info);

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
