import React from 'react';
import { Route } from 'react-router-dom';

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';
import AboutUser from './components/about/AboutUser.js';
import ProfileFriends from './components/friends/ProfileFriends.js';

const ProfilePage = () => (
  <div className="container">
    <div className="mt-4 row">
      <ProfileHeader />
      <Route path="/:username/timeline" component={ProfileTimeline} />
      <Route path="/:username/about" component={AboutUser} />
      <Route path="/:username/friends" component={ProfileFriends} />
    </div>
  </div>
);

export default ProfilePage;
