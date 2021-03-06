import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import client from '../../axiosClient';

import defaultAvatar from "../../backend/static/profiles/defaultProfileAvatar.jpg";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Collapse,
} from "reactstrap";
import {
  FaEllipsisH,
  FaRegHeart,
  FaRegComments,
  FaShareSquare,
  FaTrophy
} from "react-icons/fa";

import CommentSection from './components/CommentSection.js';

import "./post.scss";
import CommentForm from "./components/components/CommentForm";
import commentTypes from "./components/constants";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleComments = this.toggleComments.bind(this);

    const { data } = this.props;
    this.state = {
      dropdownOpen: false,
      isCommentsOpen: false,
      isFormOpen: false,
      ...data,
    };
  }

  likePost = id => {
    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
        .patch(`api/posts/${id}/like`)
        .then(res => {
          this.setState({
            likes: res.data.data
          })
        });
  };

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleCommentAdding = comment => {
      const { comments } = this.state;

      this.setState({
          comments: [ ...comments, comment ],
          isCommentsOpen: true,
      })
  };

  toggleComments() {
    const { comments, isFormOpen, isCommentsOpen } = this.state;

    if (!comments.length) return;
    if (!isCommentsOpen && isFormOpen) {
      this.setState({
        isCommentsOpen: !isCommentsOpen,
      })
    } else {
      this.setState({
        isCommentsOpen: !isCommentsOpen,
        isFormOpen: !isFormOpen,
      })
    }
  }

  toggleForm = () => {
    const { isFormOpen, isCommentsOpen } = this.state;

    if (isCommentsOpen) return;
    this.setState({
      isFormOpen: !isFormOpen
    });
  };

  deletePost = id => {
    const { deletePost } = this.props;
    const token = localStorage.getItem('token');
    const axios = client(token);

    axios
        .delete(`api/posts/${id}`);
    deletePost(id)
  };

  render() {
    const { dropdownOpen, isCommentsOpen, isFormOpen } = this.state;
    const {
        id, author, avatar, created_time, comments, text, likes, reposts
    } = this.state;

    return (
      <div className="ui-block fade-in" id={id}>
        <article className="post">
          <div className="post-author">
            <div className="user-title">
              <Link to={`/user${author.id}/timeline`} className="author-name">
                  <img
                    src={avatar? `http://localhost:8000/media/${avatar}` : defaultAvatar}
                    alt="user-img"
                    style={{ height: 40, width: 40 }}
                  />
                </Link>
              <div className="author-date">
                <Link to={`/user${author.id}/timeline`} className="author-name">
                  <h6>{author.name}</h6>
                </Link>
                <div className="post-date">
                  <span>
                    <ReactTimeAgo date={Date.parse(created_time)} />
                  </span>
                </div>
              </div>
            </div>
            <div className="more mr-4">
              <Dropdown
                isOpen={dropdownOpen}
                toggle={this.toggleDropdown}
                direction="left"
              >
                <DropdownToggle className="transparent-btn">
                  <FaEllipsisH />
                </DropdownToggle>
                <DropdownMenu>
                  <ul className="more-settings">
                    <li>
                      <button className="profile-menu-link">
                        Edit Post
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-link" onClick={() => this.deletePost(id)}>
                        Delete Post
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-link">
                        Turn Off Notifications
                      </button>
                    </li>
                  </ul>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <p>{text}</p>
          <div className="post-additional-info">
            <div>
              <Button className="transparent-btn" onClick={() => this.likePost(id)}>
                <FaRegHeart />
                <span>{likes}</span>
              </Button>
              <button
                type="button"
                className="btn btn-control"
                onClick={this.toggleForm}
              >
                Comment
              </button>
            </div>
            <div className="comments-shared">
              <Button
                type="button"
                className={`transparent-btn ${isCommentsOpen ? 'collapse-open' : ''}`}
                onClick={this.toggleComments}
              >
                <FaRegComments />
                <span>{comments.length}</span>
              </Button>
              <Button type="button" className="transparent-btn">
                <FaShareSquare />
                <span>{reposts}</span>
              </Button>
            </div>
          </div>
          <div className="control-block-button">
            <button type="button" className="btn btn-control featured-post">
              <FaTrophy />
              <span className="sr-only">Add to saved posts</span>
            </button>
            <button type="button" className="btn btn-control"  onClick={() => this.likePost(id)}>
              <FaRegHeart />
              <span className="sr-only">Like post</span>
            </button>
            <button type="button" className="btn btn-control" onClick={this.toggleComments}>
              <FaRegComments />
              <span className="sr-only">Leave a comment</span>
            </button>
            <button type="button" className="btn btn-control">
              <FaShareSquare />
              <span className="sr-only">Share post</span>
            </button>
          </div>
        </article>
        <Collapse isOpen={isCommentsOpen}>
          <CommentSection commentsData={comments} />
        </Collapse>
        <Collapse isOpen={isFormOpen}>
          <CommentForm id={id} addComment={this.handleCommentAdding} type={commentTypes.COMMENT} />
        </Collapse>
      </div>
    );
  }
}
