import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';

import { Collapse } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";

import CommentForm from "./CommentForm.js";
import ChildComment from "./ChildComment.js";

import defaultAvatar from "../../../../backend/static/profiles/defaultProfileAvatar.jpg";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { collapse } = this.state;
    const { author, avatar, created_time, id, likes, post, text } = this.props.commentData;
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
            <button type="button" className="btn btn-control">
              <FaRegHeart />
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
