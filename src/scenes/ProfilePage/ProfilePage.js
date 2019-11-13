import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';
import AboutUser from './components/about/AboutUser.js';
import ProfileFriends from './components/friends/ProfileFriends.js';

const ProfilePage = ({ match: { params: { username } } }) => {
    const userId = username? username.substr(4) : localStorage.getItem("currentUserId");
    const cur = userId === localStorage.getItem("currentUserId");

    return (
      <div className="container">
        <div className="mt-4 row">
          <ProfileHeader userId={userId} />
          <Switch>
              <Route exact path="/timeline" render={
                  () => (<ProfileTimeline userId={userId} />)
              } />
              <Route exact path="/about" render={
                  () => (<AboutUser userId={userId} />)
              } />
              <Route exact path="/friends" render={
                  () => (<ProfileFriends userId={userId} />)
              } />
              <Route exact path="/:username/timeline" render={
                  () => {
                      if (cur) return (<Redirect to="/timeline" />);
                      return (<ProfileTimeline userId={userId} />);
                  }
              } />
              <Route exact path="/:username/about" render={
                  () => {
                      if (cur) return (<Redirect to="/about" />);
                      return (<AboutUser userId={userId} />);
                  }
              } />
              <Route exact path="/:username/friends" render={
                  () => {
                      if (cur) return (<Redirect to="/friends" />);
                      return (<ProfileFriends userId={userId} />);
                  }
              } />
          </Switch>
        </div>
      </div>
    );
};

export default ProfilePage;
