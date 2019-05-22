import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AppContainer } from 'react-hot-loader';

import JavascriptTimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

import { persistor, store } from './redux/store';
import Routes from './Routes.js';

import './styles.scss';

JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(ru);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Routes />} persistor={persistor}>
      <AppContainer>
        <Routes />
      </AppContainer>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
