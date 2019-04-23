import { combineReducers } from "redux";

import { status } from "./status.reducer";
import { direction } from "./direction.reducer";
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
	status: status,
	direction: direction,
	registration: registration,
	alert: alert,
	authentication: authentication
});

export default rootReducer;
