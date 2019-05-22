import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import ProfileMenu from './components/ProfileMenu.js';

import TopHeader from '../../img/top-header1.jpg';
import User from '../../img/author-main1.jpg';

import './profileheader.scss';

class ProfileHeader extends Component {
  state = {

  };

  componentDidMount() {
    // const { currentUser } = this.props;
    const currentUser = localStorage.getItem('currentUser');
    axios
      .post('http://localhost:8000/api/profiles/headers/', {
        username: currentUser? currentUser : 'use'
      })
      .then(res => this.setState({
        ...res.data.data
      }))
  }

  render() {
    const { location, first_name, last_name, avatar, header } = this.state;

    return (
      <div className="col col-12">
        <div className="ui-block">
          <div className="top-header">
            <div className="top-header-thumb">
              <img src={`http://localhost:8000/media/${header}`} alt="user-header" />
            </div>
            <ProfileMenu />
            <div className="top-header-author">
              <Link to="/user" className="author-thumb">
                <img
                  src={`http://localhost:8000/media/${avatar}`}
                  alt="user-img"
                  style={{ height: 124, width: 124 }}
                />
              </Link>
              <div className="author-content">
                <Link to="/user" className="author-name">
                  <h4>{first_name + ' ' + last_name}</h4>
                </Link>
                <span className="country">
                  {location? location.city + ', ' + location.country : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    currentUser: user
  };
};

export default connect(mapStateToProps)(ProfileHeader);
