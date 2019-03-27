import { statusConstants } from "./../constants/status.constants";

function changeStatus(status) {
	console.log(status);
	return {
		type: statusConstants.CURRENT_STATUS,
		status
	};
}

export const userActions = {
	changeStatus
};
