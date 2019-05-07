import React from 'react';

import { IoIosCube } from 'react-icons/io';

import './shareWidget.scss';

const ShareWidget = () => (
  <div className="widget w-action">
    <IoIosCube />
    <div className="content">
      <h4 className="title">
        {'<'}
name
        {'>'}
      </h4>
      <span>The best social network theme is here!</span>
      <a href="#" className="btn btn-secondary btn-md">Share with friends!</a>
    </div>
  </div>
);

export default ShareWidget;
