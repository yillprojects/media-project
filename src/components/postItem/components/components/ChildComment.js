import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FaRegHeart } from "react-icons/fa";

class ChildComment extends Component {
	render() {
		return (
			<li className="comment-item child-comment">
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
					</div>
				</div>
			</li>
		);
	}
}

export default ChildComment;
