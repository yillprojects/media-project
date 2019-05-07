import { REHYDRATE } from 'redux-persist';

import { pageConstants } from '../constants';

export const direction = (state = { page: '1', userTab: '1' }, action) => {
  switch (action.type) {
    case pageConstants.CURRENT_PAGE:
      return { ...state, page: action.page };

    case pageConstants.CURRENT_PROFILE_TAB:
      return { ...state, userTab: action.tab };


    default:
      return state;
  }
};
