import React, { Component } from "react";
import Comment from './components/Comment.js';
import _map from "lodash/map";

import "./commentSection.scss";

const CommentSection = ({ commentsData }) => (
    <div className="comment-section">
        <ul className="comment-list">
          {
              _map(commentsData, item => <Comment key={item.id} commentData={item} />)
          }
        </ul>
    </div>
);

export default CommentSection;
