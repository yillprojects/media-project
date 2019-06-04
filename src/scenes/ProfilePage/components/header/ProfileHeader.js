import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import client from '../../../../axiosClient';

import ProfileMenu from "./components/ProfileMenu.js";

import defaultAvatar from "../../../../backend/static/profiles/defaultProfileAvatar.jpg";
import defaultHeader from "../../../../backend/static/profiles/defaultProfileHeader.jpg";

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
    const id = localStorage.getItem('currentUserId');
    const axios = client(token);

    axios
      .post(`api/profiles/${id}/get_fields`, {
        fields: ['avatar', 'header', 'last_name', 'first_name', 'location']
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
    const id = localStorage.getItem('currentUserId');

    return (
      <div className="col col-12">
        <div className="ui-block">
          <div className="top-header">
            <div className="top-header-thumb">
              <img
                src={header? `http://localhost:8000/media/profiles/${header}` : defaultHeader}
                alt="user-header"
              />
            </div>
            <ProfileMenu />
            <div className="top-header-author">
              <Link to={`/user${id}/newsfeed`} className="author-thumb">
                <img
                  src={avatar? `http://localhost:8000/media/profiles/${avatar}` : defaultAvatar}
                  alt="user-img"
                  style={{ height: 124, width: 124 }}
                />
              </Link>
              <div className="author-content">
                <Link to={`/user${id}/newsfeed`} className="author-name">
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
