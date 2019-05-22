import React, { Component } from "react";
import _map from "lodash/map";

import Comment from './components/Comment.js';
import CommentForm from './components/CommentForm.js';

import "./commentSection.scss";


// const data = [1, 2];

class CommentSection extends Component {
  render() {
    const { commentsData, post } = this.props;
    return (
      <div className="comment-section">
        <ul className="comment-list">
          {_map(commentsData, item => {
            return <Comment key={item.id} commentData={item} post={post} />;
          })}
        </ul>
        <CommentForm post={post} />
      </div>
    );
  }
}

export default CommentSection;
