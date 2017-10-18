import React, {Component} from 'react';
import Band from './Band';
import Home from './Home';
import Logs from './Logs';
import Footer from './Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Band/>

            <Route exact={true} path="/" component={Home}/>
            
            <Route path="/logs" component={Logs}/>

            <Footer/>
          </div>
        </Router>
    );
  }
}

export default App;
