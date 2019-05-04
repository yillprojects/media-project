import React, { Component } from "react";

import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

import { arrowGenerator, styles } from "config/tooltipConfig.js";
import { FaRegStar, FaStar } from "react-icons/fa";

import './pageItem.scss';

class PageItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isHoverOn: false,
			arrowRef: null
		};

		this.handleArrowRef = this.handleArrowRef.bind(this);
	}

	handleArrowRef(node) {
		this.setState({
			arrowRef: node
		});
	}

	render() {
		const { data, classes, added } = this.props;
		const { isHoverOn } = this.state;

		return (
			<div className="post-author">
				<div className="user-title">
					<div className="author-thumb">
						<img
							src={data.img}
							alt="favourite-page-img"
							style={{ height: 35, width: 35 }}
						/>
					</div>
					<div className="notification-event">
						<h6 className="title">
							<a href="#">{data.title}</a>
						</h6>
						<span className="chat-message-item">{data.type}</span>
					</div>
				</div>
				<div className="notification-icon">
					<Tooltip
						placement="top"
						title={
							<React.Fragment>
								{added ? "DELETE FROM FAVS" : "ADD TO YOUR FAVS"}
								<span className={classes.arrow} ref={this.handleArrowRef} />
							</React.Fragment>
						}
						classes={{ popper: classes.arrowPopper }}
						PopperProps={{
							popperOptions: {
								modifiers: {
									arrow: {
										enabled: Boolean(this.state.arrowRef),
										element: this.state.arrowRef
									}
								}
							}
						}}
					>
						<Button type="button" className="transparent-btn">
							{added ? <FaStar style={{ color: "#ffc923" }} /> : <FaRegStar />}
							<span className="sr-only">Change subscription</span>
						</Button>
					</Tooltip>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PageItem);
