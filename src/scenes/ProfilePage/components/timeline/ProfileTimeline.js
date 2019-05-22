import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import _map from 'lodash/map';

import Post from 'components/postItem/Post.js';
import ProfileInfo from './components/profileInfo/ProfileInfo.js';
import FriendsList from './components/friendsList/FriendsList.js';
import FavouritePages from './components/favouritePages/FavouritePages.js';

import './profileTimeline.scss';

const amount = [1, 2, 3, 4];

class ProfileTimeline extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    // const { currentUser } = this.props;
    const currentUser = localStorage.getItem('currentUser');

    axios
      .post('http://localhost:8000/api/posts/get/', {
        username: currentUser? currentUser : 'use'
      })
        .then(res => this.setState({
          posts: res.data.data
        }));
  }

  render() {
    const { posts } = this.state;
    // const { currentUser } = this.props;
      const currentUser = localStorage.getItem('currentUser');
    return [
      <div
          className=" col col-3 display-sm-none display-md-none"
          key="profile-info"
      >
        <ProfileInfo />
        <a
            className="twitter-timeline ui-block"
            data-theme="light"
            data-tweet-limit="3"
            data-link-color="#E95F28"
            href="https://twitter.com/dan_abramov?ref_src=twsrc%5Etfw"
        >

          Tweets by dan_abramov
        </a>
      </div>,
      <div className="col col-12 col-md-6 order-lg-2" key="posts">
        {_map(posts.reverse(), item => (
            <Post key={item.id} data={item} currentUser={currentUser? currentUser : 'use'} />
        ))}
      </div>,
      <div
          className="col col-md-6 col-lg-3 order-md-2 order-lg-3 display-sm-none"
          key="friends-list"
      >
        <FriendsList />
        <FavouritePages />
      </div>
    ];
  }
}

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    currentUser: user
  };
};

export default connect(mapStateToProps)(ProfileTimeline);
