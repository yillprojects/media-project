import { commentConstants } from "../constants/comment.constants";

const initialState = {
	comments: []
};

export const comment = (state = initialState, action) => {
	switch (action.type) {
		case commentConstants.ADD_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comments: [...state.comments, action.payload]
			};
		case commentConstants.ADD_COMMENT_REQUEST:
			return {
				...state,
				loading: true
			};
		case commentConstants.ADD_COMMENT_FAILURE:
			return {};
		default:
			return state;
	}
};
