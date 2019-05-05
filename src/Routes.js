import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Menus from './components/menus/Menus.js';
import LandingPage from './scenes/Landing/LandingPage.js';
import NotFound from './scenes/404/NotFound.js';
import ProfilePage from './scenes/ProfilePage/ProfilePage.js';
import Newsfeed from './scenes/Newsfeed/Newsfeed.js';

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;

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
          <DefaultLayout path="/user/" component={ProfilePage} />
          <DefaultLayout path="/newsfeed" component={Newsfeed} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(Routes);
