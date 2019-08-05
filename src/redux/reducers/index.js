import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { direction } from './direction.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { comment } from './comment.reducer';

const rootReducer = combineReducers({
  user,
  direction,
  registration,
  alert,
  authentication,
  comment
});

export default rootReducer;
