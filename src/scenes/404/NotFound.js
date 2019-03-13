import React from 'react';

import './notfound.scss';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="inner">
        <div className="notfound-404">
          <h3>Oops! Page not found</h3>
          <p className="error">
            <span className="error-number">4</span>
            <span className="error-number">0</span>
            <span className="error-number">4</span>
          </p>
        </div>
        <p className="notfound-message">We are sorry, but the page you requested was not found</p>
      </div>
    </div>
  );
};

export default NotFound;
