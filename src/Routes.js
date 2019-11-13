import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import client from './axiosClient';

import Menus from './components/menus/Menus.js';
import LandingPage from './scenes/Landing/LandingPage.js';
import NotFound from './scenes/404/NotFound.js';
import ProfilePage from './scenes/ProfilePage/ProfilePage.js';
import Newsfeed from './scenes/Newsfeed/Newsfeed.js';
import Settings from './scenes/Settings/Settings.js';

class Routes extends Component {
  render() {
    const DefaultLayout = ({ component: Component, path, }) => {
        const token = localStorage.getItem('token');

        if (token) {
            return (
                <Route
                    path={path}
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
        }

        return (<Redirect to='/' />);
    };

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <DefaultLayout exact path="/newsfeed" component={Newsfeed} />
          <DefaultLayout exact path="/settings" component={Settings} />
          <DefaultLayout exact path="/:page" component={ProfilePage} />
          <DefaultLayout strict path="/:username/" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
      user
  };
};

export default connect(mapStateToProps)(Routes);
