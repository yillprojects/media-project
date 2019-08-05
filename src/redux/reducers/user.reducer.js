import { userConstants } from '../constants';

export const user = (state = { status: 'online', name: undefined }, action) => {
  switch (action.type) {
    case userConstants.CURRENT_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case userConstants.NAME: {
      return {
        ...state,
        name: action.name,
      };
    }

    default:
      return state;
  }
};
