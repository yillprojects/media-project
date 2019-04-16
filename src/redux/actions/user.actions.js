import { statusConstants } from "../constants/status.constants";
import { pageConstants } from "../constants/page.constants";

function changeStatus(status) {
	return {
		type: statusConstants.CURRENT_STATUS,
		status
	};
}

function currentPage(page) {
	return { type: pageConstants.CURRENT_PAGE, page };
}

function currentProfileTab(tab) {
	return {
		type: pageConstants.CURRENT_PROFILE_TAB,
		tab
	};
}

export const userActions = {
	changeStatus,
	currentPage,
	currentProfileTab
};
