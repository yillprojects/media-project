import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import client from "../../../../axiosClient";

import { FaRegHeart } from "react-icons/fa";
import defaultAvatar from "../../../../backend/static/profiles/defaultProfileAvatar.jpg";

class ChildComment extends Component {
	constructor(props) {
		super(props);

		const { likes } = this.props.replyData;
		this.state = {
			likes,
		};
	}

	likeReply = () => {
		const token = localStorage.getItem('token');
		const axios = client(token);
		const { id } = this.props.replyData;

		axios
			.patch(`api/replies/${id}/like`)
			.then(res => this.setState(
				{
					likes: res.data.data
				}
			))
	};

	render() {
		const { author, avatar, created_time, text } = this.props.replyData;
		const { likes } = this.state;

		return (
			<li className="comment-item child-comment">
				<div className="post">
					<div className="post-author">
						<div className="user-title">
							<img
								src={avatar ? `http://localhost:8000/media/${avatar}` : defaultAvatar}
								alt="user-img"
								style={{ height: 40, width: 40 }}
							/>
							<div className="author-date">
								<Link to={`user${author.id}/newsfeed`} className="author-name">
									<h6>{author.name}</h6>
								</Link>
								<div className="post-date">
									<ReactTimeAgo date={Date.parse(created_time)} />
								</div>
							</div>
						</div>
					</div>
					<p>
						{text}
					</p>
					<div className="post-additional-info">
						<button type="button" className="btn btn-control" onClick={this.likeReply}>
							<FaRegHeart />
							<span>{likes}</span>
							<span className="sr-only">Like post</span>
						</button>
					</div>
				</div>
			</li>
		);
	}
}

export default ChildComment;
