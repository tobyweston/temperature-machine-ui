import React, {Component} from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';

class Logs extends Component {

  render() {
    return (
        <div>
          <h1>Logs</h1>
          <Footer link={<Link to="/">View the temperatures</Link>}/>
        </div>
    );
  }
}

export default Logs;
