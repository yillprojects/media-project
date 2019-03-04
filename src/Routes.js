import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Redirect } from 'react-router';

import LandingPage from './scenes/Landing/LandingPage.js';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </Router>
);

export default Routes;
