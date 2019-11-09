import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { direction } from './direction.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { comment } from './comment.reducer';

import { authenticationConstants } from '../constants/authentication.constants';

const appReducer = combineReducers({
  user,
  direction,
  registration,
  alert,
  authentication,
  comment
});

const rootReducer = (state, action) => {
  if (action.type === authenticationConstants.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
