import { combineReducers } from 'redux';

import { status } from './status.reducer';
import { direction } from './direction.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
  status,
  direction,
  registration,
  alert,
  authentication
});

export default rootReducer;
