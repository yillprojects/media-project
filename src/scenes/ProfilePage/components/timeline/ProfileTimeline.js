import React, { Component } from "react";
import { connect } from "react-redux";
import client from "../../../../axiosClient";

import _map from "lodash/map";

import { TwitterTimelineEmbed } from "react-twitter-embed";

import Post from "components/postItem/Post.js";
import ProfileInfo from "./components/profileInfo/ProfileInfo.js";
import FriendsList from "./components/friendsList/FriendsList.js";
import FavouritePages from "./components/favouritePages/FavouritePages.js";

import "./profileTimeline.scss";

class ProfileTimeline extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      posts: [],
      twitterLink: ""
    };
  }

  loadData = () => {
    const token = localStorage.getItem("token");
    const { userId } = this.props;
    const axios = client(token);

    axios.get(`api/profiles/${userId}/posts`).then(res => {
      if (this._isMounted) {
        this.setState({
          posts: res.data.data.reverse()
        });
      }
    });

    axios
      .post(`api/profiles/${userId}/get_fields`, { fields: ["twitter"] })
      .then(res => {
        if (this._isMounted) {
          const { twitter } = res.data.data;

          if (twitter) {
            const link = twitter.replace("https://twitter.com/", "").replace("http://twitter.com/", "");
            this.setState({
              twitterLink: link
            });
          }
        }
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deletePost = id => {
    let posts = this.state.posts;
    const toDelete = posts.find(item => id === item.id);
    const ind = posts.indexOf(toDelete);
    posts.splice(ind, 1);

    const postToDelete = document.getElementById(id);
    postToDelete.className += " fade-out";

    setTimeout(() => {
      this.setState({
        posts
      });
    }, 500);
  };

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
        this.loadData();
    }
  }

  render() {
    const { posts, twitterLink } = this.state;
    const { userId } = this.props;
    return [
        <div
          className=" col col-3 display-sm-none display-md-none"
          key="profile-info"
        >
          <ProfileInfo userId={userId} />
          {twitterLink ? (
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName={twitterLink}
              options={{ height: 400 }}
            />
          ) : (
            ""
          )}
        </div>,
        <div className="col col-12 col-md-6 order-lg-2" key="posts">
          {posts.length === 0 ? (
            <span className="none-posts">Nothing to see</span>
          ) : (
            _map(posts, item => (
              <Post key={item.id} data={item} deletePost={this.deletePost} />
            ))
          )}
        </div>,
        <div
          className="col col-md-6 col-lg-3 order-md-2 order-lg-3 display-sm-none"
          key="friends-list"
        >
          <FriendsList userId={userId} />
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
