import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import rootReducer from "./redux/reducers";

import { AppContainer } from "react-hot-loader";

const store = createStore(rootReducer, applyMiddleware(thunk));

import Routes from "./Routes.js";

import "./styles.scss";

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Routes />
		</AppContainer>
	</Provider>,
	document.getElementById("root")
);

if (module.hot) {
	module.hot.accept();
}
