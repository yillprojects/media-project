import { statusConstants } from '../constants';

export const status = (state = { status: 'online' }, action) => {
  switch (action.type) {
    case statusConstants.CURRENT_STATUS:
      return {
        status: action.status
      };
    default:
      return state;
  }
};
