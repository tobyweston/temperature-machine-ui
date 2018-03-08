import React from 'react';
import Websocket from 'react-websocket';
import Temperature from './Temperature'
import Spinner from './Spinner';

import './css/temperatures.css';

class LiveTemperatures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      measurements: []
    }
  }

  render() {
    const url = this.getUrl(this.props.showAveragedSensors);

    return <div>
      <div className="temperatures-heading">
        <p>Current Temperature</p>
      </div>
      <div className="temperatures-area">
        { this.renderMainTemperatureArea() }
      </div>

      <Websocket url={ url } onMessage={ this.update.bind(this) } />
    </div>
  }

  renderMainTemperatureArea() {
    let element = null;
    if (this.state.loading === true)
      element = <Spinner/>;
    else if (this.state.error)
      element = this.renderError(this.state.error);
    else
      element = this.renderTemperatures(this.state.measurements);
    return element;
  }
  
  renderTemperatures(measurements) {
    return <div> {
      measurements.map(measurement => {
        return <Temperature key={measurement.host} sensors={measurement.sensors} lastUpdate={measurement.seconds} source={measurement.host} />
      })
    } </div>;
  }

  renderError(error) {
    return <pre>{ error.toString() }</pre>
  }

  getUrl(showAveragedSensors) {
    let url = null;
    if (showAveragedSensors === true)
      url = 'ws://localhost:11900/temperatures/live/average';
    else
      url = 'ws://localhost:11900/temperatures/live';
    return url;
  }

  update(data) {
    let latest = JSON.parse(data);
    this.setState({
      measurements: latest.measurements.sort(function(a, b) {
        if (a.host < b.host) return -1;
        if (a.host > b.host) return 1;
        return 0;
      })
    });
  }
}

export default LiveTemperatures;