import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import Menus from './components/menus/Menus.js';
import LandingPage from './scenes/Landing/LandingPage.js';
import NotFound from './scenes/404/NotFound.js';
import ProfilePage from './scenes/ProfilePage/ProfilePage.js';

const Routes = () => {
  const DefaultLayout = ({ component: Component }) => (
    <Route
      render={props => (
        <div>
          <Menus />
          <div className="main-layout">
            <Component {...props} />
          </div>
        </div>
      )}
    />
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <DefaultLayout path="/user" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default Routes;
