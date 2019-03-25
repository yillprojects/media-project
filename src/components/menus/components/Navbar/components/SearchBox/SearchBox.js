import React, { Component } from "react";
import axios from "axios";

import SearchMobile from './components/SearchMobile.js';
import SearchLaptop from './components/SearchLaptop.js';
import Suggestions from "./components/Suggestions.js";

import "./searchbox.scss";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      query: "",
      info: [],
      results: []
    };
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const info = res.data;
      this.setState({ info });
    });
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
          let filteredData = info.filter(item => {
            const options = [item.name, item.username];
            let isItemFound = "notfound";

            options.map(data => {
              if (data.toLowerCase().includes(query)) {
                isItemFound = "found";
              }
            });

            return isItemFound == "found" ? item : "";
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

    return (
      <div className="search-wrap">
        <SearchLaptop handleInputChange={this.handleInputChange} query={query} results={results}/>
        <SearchMobile handleInputChange={this.handleInputChange} query={query} results={results} />
      </div> 
    );
  }
}

export default SearchBox;
