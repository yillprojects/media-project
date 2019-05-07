import uuidv4 from 'uuid/v4';

import { alertConstants } from '../constants';

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
        key: uuidv4()
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
        key: uuidv4()
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
