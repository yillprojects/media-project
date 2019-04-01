import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';
import rootReducer from './redux/reducers';


import Routes from './Routes.js';

import './styles.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Routes />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
