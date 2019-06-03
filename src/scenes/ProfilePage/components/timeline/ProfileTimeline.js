import React, { Component } from 'react';
import { connect } from 'react-redux';
import client from '../../../../axiosClient';

import _map from "lodash/map";

import Post from "components/postItem/Post.js";
import ProfileInfo from "./components/profileInfo/ProfileInfo.js";
import FriendsList from "./components/friendsList/FriendsList.js";
import FavouritePages from "./components/favouritePages/FavouritePages.js";

import "./profileTimeline.scss";

class ProfileTimeline extends Component {
  _isMounted = false;
  state = {
    posts: []
  };

  componentDidMount() {
    this._isMounted = true;

    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
      .get("api/posts")
      .then(res => {
        if (this._isMounted) {
          this.setState({
            posts: res.data
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deletePost = id => {
    let posts = this.state.posts;
    const toDelete = posts.find(item => id === item.id);
    const ind = posts.indexOf(toDelete);
    posts.splice(ind, 1);
    posts.reverse();
    this.setState({
      posts
    })
  };

  render() {
    const { posts } = this.state;
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
        {posts.length === 0 ? (
          <span className="none-posts">Nothing to see</span>
        ) : (
          _map(posts.reverse(), item => (
            <Post
              key={item.id}
              data={item}
              currentUser={currentUser}
            />
          ))
        )}
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

const mapStateToProps = state => {
  const { user } = state.authentication;
  return {
    currentUser: user
  };
};

export default connect(mapStateToProps)(ProfileTimeline);
