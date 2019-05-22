import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import axios from 'axios';

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

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);

    const { data, currentUser } = this.props;
    this.state = {
      dropdownOpen: false,
      collapse: false,
      isLiked: data.liked_by.includes(currentUser),
      ...data,
      currentUser
    };
  }

  like = id => {
    const { isLiked, likes, currentUser } = this.state;

    if (!isLiked) {
      axios.post('http://localhost:8000/api/posts/like/', {
          username: currentUser,
          id
      });
      this.setState({
        isLiked: !isLiked,
        likes: likes + 1
      })
    } else {
      axios.post('http://localhost:8000/api/posts/dislike/', {
          username: currentUser,
          id
      });
      this.setState({
        isLiked: !isLiked,
        likes: likes - 1
      })
    }
  };

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { dropdownOpen, users, collapse } = this.state;
    const {
        id, author, username, avatar, created_time, comments, text, likes, reposts, liked_by
    } = this.state;
    return (
      <div className="ui-block">
        <article className="post">
          <div className="post-author">
            <div className="user-title">
              <img
                src={`http://localhost:8000/media/${avatar}`}
                alt="user-img"
                style={{ height: 40, width: 40 }}
              />
              <div className="author-date">
                <Link to={`/${username}/newsfeed/`} className="author-name">
                  <h6>{author}</h6>
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
                      <a href="#" className="profile-menu-link">
                        Edit Post
                      </a>
                    </li>
                    <li>
                      <a href="#" className="profile-menu-link">
                        Delete Post
                      </a>
                    </li>
                    <li>
                      <a href="#" className="profile-menu-link">
                        Turn Off Notifications
                      </a>
                    </li>
                  </ul>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <p>{text}</p>
          <div className="post-additional-info">
            <Button className="transparent-btn" onClick={() => this.like(id)}>
              <FaRegHeart />
              <span>{likes}</span>
            </Button>
            <div className="comments-shared">
              <Button
                type="button"
                className={`transparent-btn ${collapse ? 'collapse-open' : ''}`}
                onClick={this.toggleCollapse}
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
            <button type="button" className="btn btn-control">
              <FaRegHeart />
              <span className="sr-only">Like post</span>
            </button>
            <button type="button" className="btn btn-control">
              <FaRegComments />
              <span className="sr-only">Leave a comment</span>
            </button>
            <button type="button" className="btn btn-control">
              <FaShareSquare />
              <span className="sr-only">Share post</span>
            </button>
          </div>
        </article>
        <Collapse isOpen={collapse}>
          <CommentSection commentsData={comments} post={id} />
        </Collapse>
      </div>
    );
  }
}
