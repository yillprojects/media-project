import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Menus from './components/menus/Menus.js';
import LandingPage from './scenes/Landing/LandingPage.js';
import NotFound from './scenes/404/NotFound.js';
import ProfilePage from './scenes/ProfilePage/ProfilePage.js';
import Newsfeed from './scenes/Newsfeed/Newsfeed.js';

class Routes extends Component {
  render() {
      // axios
      //     .post('http://localhost:8000/api/posts/add_comment/', {
      //         post_id: 24,
      //         author: localStorage.getItem('currentUser'),
      //         text: 'Kek comment.'
      //     });
    // const { loggedIn, user } = this.props;
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
          <DefaultLayout path="/:username/newsfeed" component={Newsfeed} />
          <DefaultLayout path="/:username/" component={ProfilePage} />
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
