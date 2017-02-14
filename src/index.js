import React from 'react';
import ReactDOM from 'react-dom';
import Temperature from './Temperature';
import Band from './Band';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <div>
    <Band />
    <div className="jumbotron">
      <div className="container">
        <div className="col-md-3">
          <p className="lead">Current Temperature</p>
          <Temperature />
        </div>
        <div className="col-md-9">
          <p className="lead">Last 24 Hours</p>
          <div className="row" id="chart-img"></div>
        </div>
      </div>
    </div>
  </div>,

  document.getElementById('root')
);
