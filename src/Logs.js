import React, {Component} from 'react';
import Log from './Log';
import {Link, Route} from 'react-router-dom';
import Footer from './Footer';

import './css/logs.css';

class Logs extends Component {

  render() {
    return (

        <div className='logs-component'>
          <h1>Logs</h1>

          <ul>
            <li><Link to='/logs/a'>A</Link></li>
            <li><Link to='/logs/b'>B</Link></li>
          </ul>

          <Route path='/logs/a' component={ Log }/>

          <Route path='/logs/b' render={ () => {
            return <Log host='localhost'/>;
          }}/>

          <Footer link={<Link to='/'>View the temperatures</Link>}/>

        </div>
    );
  }
}

export default Logs;
