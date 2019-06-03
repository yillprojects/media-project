import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import client from '../../../../axiosClient';

import ProfileMenu from "./components/ProfileMenu.js";

import TopHeader from "../../img/top-header1.jpg";
import User from "../../img/author-main1.jpg";

import "./profileheader.scss";

class ProfileHeader extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
    const token = localStorage.getItem('token');
    const axios = client(token);
    // const { currentUser } = this.props;
    const currentUser = localStorage.getItem("currentUser");
    axios
      .post("http://localhost:8000/api/profiles/headers/", {
        username: currentUser ? currentUser : "use"
      })
      .then(res => {
        if (this._isMounted) {
          this.setState({
            ...res.data.data
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { location, first_name, last_name, avatar, header } = this.state;
    const currentUser = localStorage.getItem('currentUser');

    return (
      <div className="col col-12">
        <div className="ui-block">
          <div className="top-header">
            <div className="top-header-thumb">
              <img
                src={TopHeader}
                alt="user-header"
              />
            </div>
            <ProfileMenu />
            <div className="top-header-author">
              <Link to={`/${currentUser}/timeline`} className="author-thumb">
                <img
                  src={User}
                  alt="user-img"
                  style={{ height: 124, width: 124 }}
                />
              </Link>
              <div className="author-content">
                <Link to={`/${currentUser}/timeline`} className="author-name">
                  <h4>{first_name + ' ' + last_name}</h4>
                </Link>
                <span className="country">
                  {location ? location.city + ", " + location.country : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authentication;
  return {
    currentUser: user
  };
};

export default connect(mapStateToProps)(ProfileHeader);
