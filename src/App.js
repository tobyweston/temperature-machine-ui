import React, {Component} from 'react';
import Home from './Home';
import Band from './Band';
import Logs from './Logs';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './css/app.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Band/>

            <Route exact="true" path="/" component={Home}/>
            
            <Route path="/logs" component={Logs}/>

            <hr/>
            <footer>
              <span className="copyright">&copy; 2016-2017 toby weston, <a href="http://temperature-machine.com">temperature-machine.com</a></span>
              <span className="logs-link"><Link to="logs">View the logs</Link></span>
            </footer>

          </div>
        </Router>
    );
  }
}

export default App;
