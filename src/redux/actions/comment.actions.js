import { commentConstants } from "../constants/comment.constants";
import axios from 'axios';

function addComment(comment) {
	return dispatch => {
		dispatch(request(comment));
		console.log(comment);

		const { post, text } = comment;
		axios
			.post('https://localhost:8000/api/posts/add_comment/', {
				post_id: post,
				author: localStorage.getItem('currentUser'),
				text
			});
		if (1) {
			dispatch(success(comment));
		} else {
			dispatch(failure(comment));
		}
	};

	function request(comment) {
		return {
			type: commentConstants.ADD_COMMENT_REQUEST,
			payload: comment
		};
	}

	function success(comment) {
		return {
			type: commentConstants.ADD_COMMENT_SUCCESS,
			payload: comment
		};
	}

	function failure(comment) {
		return {
			type: commentConstants.ADD_COMMENT_FAILURE,
			payload: comment
		};
	}
}

export const commentActions = { addComment };
