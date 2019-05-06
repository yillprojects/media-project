import { commentConstants } from "../constants/comment.constants";

function addComment(comment) {
	return dispatch => {
		dispatch(request(comment));

		// axios request
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
