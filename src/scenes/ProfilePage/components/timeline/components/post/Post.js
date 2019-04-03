import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Dropdown, DropdownToggle, DropdownMenu, Button } from "reactstrap";
import {
	FaEllipsisH,
	FaRegHeart,
	FaRegComments,
	FaShareSquare,
	FaTrophy
} from "react-icons/fa";

import User from "./../../../../img/author-main1.jpg";

import "./post.scss";

export default class Post extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		const { dropdownOpen } = this.state;

		return (
			<div className="ui-block">
				<article className="post">
					<div className="post-author">
						<div className="user-title">
							<img
								src={User}
								alt="user-img"
								style={{ height: 40, width: 40 }}
							/>
							<div className="author-date">
								<Link to="/user" className="author-name">
									<h6>James Spiegel</h6>
								</Link>
								<div className="post-date">
									<span>18 hours ago</span>
								</div>
							</div>
						</div>
						<div className="more mr-4">
							<Dropdown
								isOpen={dropdownOpen}
								toggle={this.toggle}
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
							<Button type="button" className="transparent-btn">
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
							<FaShareSquare/>
							<span className="sr-only">Share post</span>
						</button>
					</div>
				</article>
			</div>
		);
	}
}
