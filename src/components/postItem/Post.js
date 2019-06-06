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

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);

    const { data } = this.props;
    this.state = {
      dropdownOpen: false,
      collapse: false,
      ...data,
      commentsNum: data.comments.length
    };
  }

  likePost = id => {
    const token = localStorage.getItem('token');
    const author = localStorage.getItem('currentUserId');
    const axios = client(token);

    axios
        .patch(`api/posts/${id}/like`, {
          author
        })
        .then(res => {
          console.log(res);
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

  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  addComment = () => {
    const { commentsNum } = this.state;
    this.setState({
        commentsNum: commentsNum + 1
    })
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
    const { dropdownOpen, users, collapse } = this.state;
    const {
        id, author, avatar, created_time, comments, commentsNum, text, likes, reposts
    } = this.state;

    console.log(author);
    // console.log(id,':', likes)
    return (
      <div className="ui-block fade-in" id={id}>
        <article className="post">
          <div className="post-author">
            <div className="user-title">
              <img
                src={avatar? `http://localhost:8000/media/${avatar}` : defaultAvatar}
                alt="user-img"
                style={{ height: 40, width: 40 }}
              />
              <div className="author-date">
                <Link to={`/user${author.id}/newsfeed/`} className="author-name">
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
            <Button className="transparent-btn" onClick={() => this.likePost(id)}>
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
                <span>{commentsNum}</span>
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
            <button type="button" className="btn btn-control" onClick={this.toggleCollapse}>
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
          <CommentSection commentsData={comments} post={id} addComment={this.addComment} />
        </Collapse>
      </div>
    );
  }
}
