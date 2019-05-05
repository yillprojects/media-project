import React from 'react';
import { Route } from 'react-router-dom';

import ProfileHeader from './components/header/ProfileHeader.js';
import ProfileTimeline from './components/timeline/ProfileTimeline.js';
import AboutUser from './components/about/AboutUser.js';

const ProfilePage = () => (
  <div className="container">
    <div className="mt-4 row">
      <ProfileHeader />
      <Route path="/user/timeline" component={ProfileTimeline} />
      <Route path="/user/about" component={AboutUser} />
    </div>
  </div>
);

export default ProfilePage;
