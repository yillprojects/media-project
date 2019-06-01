import React, { Component } from "react";
import _map from "lodash/map";
import axios from 'axios';

import Comment from './components/Comment.js';
import CommentForm from './components/CommentForm.js';

import "./commentSection.scss";


// const data = [1, 2];

class CommentSection extends Component {
  state = {
      commentsData: this.props.commentsData
  };

  handleCommentAdding = comment => {
      const { commentsData } = this.state;
      const { addComment } = this.props;

      addComment();
      this.setState({
          commentsData: [ ...commentsData, comment ]
      })
  };

  render() {
    const { post } = this.props;
    const { commentsData } = this.state;

    return (
      <div className="comment-section">
        <ul className="comment-list">
          {_map(commentsData, item => {
            return <Comment key={item.id} commentData={item} post={post} />;
          })}
        </ul>
        <CommentForm post={post} addComment={this.handleCommentAdding} />
      </div>
    );
  }
}

export default CommentSection;
