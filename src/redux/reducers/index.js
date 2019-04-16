import { combineReducers } from "redux";

import { status } from "./status.reducer";
import { direction } from "./direction.reducer";

const rootReducer = combineReducers({
	status: status,
	direction: direction
});

export default rootReducer;
