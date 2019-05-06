import React, { Component } from "react";
import _map from "lodash/map";

import Comment from './components/Comment.js';
import CommentForm from './components/CommentForm.js';

import "./commentSection.scss";


const data = [1, 2];

class CommentSection extends Component {
  render() {
    return (
      <div className="comment-section">
        <ul className="comment-list">
          {_map(data, item => {
            return <Comment key={item} />;
          })}
        </ul>
        <CommentForm />
      </div>
    );
  }
}

export default CommentSection;
