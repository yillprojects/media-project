import React from 'react';

import UserInfo from './components/UserInfo.js';
import UserHobbies from './components/UserHobbies.js';
import EducationAndWork from './components/EducationAndWork.js';

import './aboutUser.scss';

const AboutUser = () => [
  <div
    className="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12"
    key="user-info"
  >
    <UserInfo />
  </div>,
  <div
    className="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12"
    key="user-secondary"
  >
    <UserHobbies />
    <EducationAndWork />
  </div>
];

export default AboutUser;
