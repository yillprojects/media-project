import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import client from './axiosClient';

import Menus from './components/menus/Menus.js';
import LandingPage from './scenes/Landing/LandingPage.js';
import NotFound from './scenes/404/NotFound.js';
import ProfilePage from './scenes/ProfilePage/ProfilePage.js';
import Newsfeed from './scenes/Newsfeed/Newsfeed.js';


import defaultAvatar from "./backend/static/profiles/defaultProfileAvatar.jpg";
import defaultHeader from "./backend/static/profiles/defaultProfileHeader.jpg";

class Routes extends Component {
  componentDidMount() {
      const token = localStorage.getItem('token');
      const axios = client(token);
  //
  //     for(let i = 1; i <= 15; i++) {
  //         axios
  //               .patch(`api/profiles/${i}`, {
  //                   avatar: defaultAvatar,
  //                   header: defaultHeader
  //               });
  //     }
  }

  render() {
    const token = localStorage.getItem('token');

    const DefaultLayout = ({ component: Component }) => {
        if (token)
            return (
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
        return (<Redirect to='/' />);
    };

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
