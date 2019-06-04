import React, { Component } from "react";
import { connect } from "react-redux";
import client from "../../axiosClient.js";

import _map from "lodash/map";

import { userActions } from "redux/actions/index.js";

import Calendar from "./components/calendar/Calendar.js";
import BirthdayWidget from "./components/birthdayWidget/BirthdayWidget.js";
import ShareWidget from "./components/shareWidget/shareWidget.js";
import NewsfeedForm from "./components/newsfeedForm/NewsfeedForm.js";
import SuggestedPages from "./components/suggestedPages/SuggestedPages.js";
import Post from "./../../components/postItem/Post.js";

import "./newsfeed.scss";

class Newsfeed extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      visible: 7
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("currentUserId");
    const axios = client(token);

    axios.get(`api/profiles/${id}/newsfeed`).then(res => {
      if (this._isMounted) {
        this.setState({
          posts: res.data.data.reverse()
        });
      }
    });
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.currentPage("1"));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(post) {
    this.setState(prev => ({
      posts: [post, ...prev.posts]
    }))

  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 7 };
    });
  }

  render() {
    const { posts, visible } = this.state;
    console.log(posts, visible);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col col-xl-6 order-xl-2 col-lg-12 col-md-12 col-sm-12 col-12">
            <NewsfeedForm addPost={this.handleSubmit} />

            {posts.slice(0, visible).map(post => (
              <Post data={post} key={post.id} />
            ))}
            {visible < posts.length && (
              <div className="load-more">
                <button
                  type="button"
                  onClick={this.loadMore}
                  className="btn btn-secondary"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
          <div className="col col-xl-3 order-xl-1 col-lg-6 col-md-6 col-sm-6 col-12">
            <Calendar />
            <BirthdayWidget />
          </div>

          <div className="col col-xl-3 order-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <ShareWidget />
            <SuggestedPages />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Newsfeed);
