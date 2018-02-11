import React, {Component} from 'react';
import Band from './Band';
import Home from './Home';
import Logs from './Logs';
import Connections from './Connections';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import moment from 'moment-timezone';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timezone: "UTC"
    }
  }

  componentDidMount() {
    this.setTimezone(this.state.timezone);
  }
  
  render() {
    return (
        <Router>
          <div>
            <Band/>
            <Route exact={true} path="/" component={ this.home() } />
            <Route path="/logs" component={ Logs } />
            <Route path="/connections" component={ Connections } />
          </div>
        </Router>
    );
  }
  
  home() {
    return () => <Home timezone={ this.state.timezone } onTimezoneChange={ (timezone) => this.setTimezone(timezone) } />
  }
  
  setTimezone(timezone) {
    moment.tz.setDefault(timezone);
    this.setState({
      timezone: timezone
    });
  }
}

  export default App;
