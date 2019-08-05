import { userConstants } from '../constants/user.constants';
import { pageConstants } from '../constants/page.constants';

function changeStatus(status) {
  return {
    type: userConstants.CURRENT_STATUS,
    status
  };
}

function changeName(name) {
  return {
    type: userConstants.NAME,
    name
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
  currentProfileTab,
  changeName,
};
