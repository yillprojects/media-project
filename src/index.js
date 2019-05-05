import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AppContainer } from 'react-hot-loader';

import { persistor, store } from './redux/store';
import Routes from './Routes.js';

import './styles.scss';

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
