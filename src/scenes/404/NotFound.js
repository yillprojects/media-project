import React from 'react';

import './notfound.scss';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="inner">
        <div className="notfound-404">
          <h3>Oops! Page not found</h3>
          <p className="404"> 
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </p>
          <p>we are sorry, but the page you requested was not found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
