import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import client from '../../../../axiosClient';

import { Collapse } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";

import CommentForm from "./CommentForm.js";
import ChildComment from "./ChildComment.js";

import defaultAvatar from "../../../../backend/static/profiles/defaultProfileAvatar.jpg";

class Comment extends Component {
  constructor(props) {
    super(props);

    const { likes } = this.props.commentData;

    this.state = {
      collapse: false,
      likes
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.like = this.like.bind(this);
  }

  like(commentId) {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('currentUserId');
    const axios = client(token);

    axios
        .patch(`api/comments/${commentId}/like`, {
          author: id
        })
        .then(res => this.setState({
          likes: res.data.data
        }));
  };

  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { collapse, likes } = this.state;
    const { author, avatar, created_time, id, post, text } = this.props.commentData;
    return (
      <li className="comment-item">
        <div className="post">
          <div className="post-author">
            <div className="user-title">
              <img
                src={avatar? `http://localhost:8000/media/${avatar}` : defaultAvatar}
                alt="user-img"
                style={{ height: 40, width: 40 }}
              />
              <div className="author-date">
                <Link to={`/user${author.id}/newsfeed`} className="author-name">
                  <h6>{author.name}</h6>
                </Link>
                <div className="post-date">
                  <span>
                      <ReactTimeAgo date={Date.parse(created_time)} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p>{text}</p>
          <div className="post-additional-info">
            <button type="button" className="btn btn-control" onClick={() => this.like(id)}>
              <FaRegHeart />
              {likes}
              <span className="sr-only">Like post</span>
            </button>
            <button
              type="button"
              className="btn btn-control"
              onClick={this.toggleCollapse}
            >
              Reply
            </button>
          </div>
        </div>
        <ul className="children">
        </ul>
        <Collapse isOpen={collapse}>
          <CommentForm />
        </Collapse>
      </li>
    );
  }
}

export default Comment;
