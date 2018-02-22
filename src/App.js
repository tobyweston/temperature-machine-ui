import React, {Component} from 'react';
import Band from './Band';
import Home from './Home';
import Logs from './Logs';
import Connections from './Connections';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import moment from 'moment-timezone';
import SidebarMenu from "./SidebarMenu";

class App extends Component {

  constructor(props) {
    super(props);
    this.onToggleShowAveragedSensors = this.onToggleShowAveragedSensors.bind(this); // voodoo

    this.state = {
      timezone: "UTC",
      showAveragedSensors: true,
      forceRefreshOfAveragedSensors: false
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
            <SidebarMenu showAveragedSensors={this.state.showAveragedSensors} onToggleShowAveragedSensors={this.onToggleShowAveragedSensors}/>
            <Route exact={true} path="/" render={ this.home() } />
            <Route path="/logs" component={ Logs } />
            <Route path="/connections" component={ Connections } />
          </div>
        </Router>
    );
  }
  
  home() {
    return () => {
      return <Home timezone={ this.state.timezone } forceRefreshOfAveragedSensors={ this.state.forceRefreshOfAveragedSensors } showAveragedSensors={ this.state.showAveragedSensors } onTimezoneChange={ (timezone) => this.setTimezone(timezone) } /> 
    }
  }
  
  setTimezone(timezone) {
    moment.tz.setDefault(timezone);
    this.setState({
      timezone: timezone
    });
  }

  onToggleShowAveragedSensors(newValue) {
    if (this.state.showAveragedSensors !== newValue) {
      this.setState({
        showAveragedSensors: newValue,
        forceRefreshOfAveragedSensors: true
      }, () => {
        // a callback run after setState is applied (attempt to toggle and force a refresh without spinning)
        this.setState({
          forceRefreshOfAveragedSensors: false
        })
      })
    }
  }
}

export default App;
