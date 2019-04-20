import { compose, createStore, applyMiddleware } from "redux";
import { autoRehydrate, persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const persistConfig = {
	key: "root",
	storage: storage,
	stateReconciler: autoMergeLevel2,
	blacklist: ['registration', 'alert']
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	pReducer,
	composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
