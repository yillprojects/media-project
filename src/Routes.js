import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Redirect } from 'react-router';

import LandingPage from './scenes/Landing/LandingPage.js';
import NotFound from './scenes/404/NotFound.js';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
