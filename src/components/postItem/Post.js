import React, { Component } from "react";
import { Link } from "react-router-dom";

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

    this.state = {
      dropdownOpen: false,
      collapse: false
    };
  }

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

    return (
      <div className="ui-block">
        <article className="post">
          <div className="post-author">
            <div className="user-title">
              <img
                src="https://via.placeholder.com/150"
                alt="user-img"
                style={{ height: 40, width: 40 }}
              />
              <div className="author-date">
                <Link to="/user" className="author-name">
                  <h6>{users ? users[0].username : "Andrew"}</h6>
                </Link>
                <div className="post-date">
                  <span>18 hours ago</span>
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
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque.
          </p>
          <div className="post-additional-info">
            <Button className="transparent-btn">
              <FaRegHeart />
              <span>8</span>
            </Button>
            <div className="comments-shared">
              <Button
                type="button"
                className={`transparent-btn ${collapse ? 'collapse-open' : ''}`}
                onClick={this.toggleCollapse}
              >
                <FaRegComments />
                <span>8</span>
              </Button>
              <Button type="button" className="transparent-btn">
                <FaShareSquare />
                <span>8</span>
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
          <CommentSection />
        </Collapse>
      </div>
    );
  }
}
