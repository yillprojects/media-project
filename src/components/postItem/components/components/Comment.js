import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Collapse } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";

import CommentForm from "./CommentForm.js";
import ChildComment from "./ChildComment.js";

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

    return (
      <li className="comment-item">
        <div className="post">
          <div className="post-author">
            <div className="user-title">
              <img
                src="https://via.placeholder.com/150"
                alt="user-img"
                style={{ height: 40, width: 40 }}
              />
              <div className="author-date">
                <Link to="/user" className="author-name">
                  <h6>Andrew</h6>
                </Link>
                <div className="post-date">
                  <span>18 hours ago</span>
                </div>
              </div>
            </div>
          </div>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium der doloremque laudantium.
          </p>
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
          <ChildComment />
          <ChildComment />
        </ul>
        <Collapse isOpen={collapse}>
          <CommentForm />
        </Collapse>
      </li>
    );
  }
}

export default Comment;
