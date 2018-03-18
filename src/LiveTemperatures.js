import React from 'react';
import Temperature from './Temperature'
import Spinner from './Spinner';

import './css/temperatures.css';

class LiveTemperatures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      measurements: [],
      socket: null
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.showAveragedSensors !== nextProps.showAveragedSensors) {
      if (this.state.socket) {
        this.state.socket.close();
      }      
      this.setState({
        socket: this.createSocket(nextProps.showAveragedSensors)
      });
    }
  }
  
  componentDidMount() {
    this.setState({
      socket: this.createSocket(this.props.showAveragedSensors)
    });
  }
  
  createSocket(showAverage) {
    const socket = new WebSocket(this.getUrl(showAverage));
    socket.onopen = () => this.onSocketOpen();
    socket.onmessage = (message) => this.onSocketData(message);
    socket.onclose = () => this.onSocketClose();
    return socket;
  }

  render() {
    return <div>
      <div className="temperatures-heading">
        <p>Current Temperature</p>
      </div>
      <div className="temperatures-area">
        { this.renderMainTemperatureArea() }
      </div>
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
      measurements.map((measurement, index) => {
        return <Temperature key={measurement.host + '-' + index} sensors={measurement.sensors} lastUpdate={measurement.seconds} source={measurement.host} />
      })
    } </div>;
  }

  renderError(error) {
    return <pre>{ error.toString() }</pre>
  }

  getUrl(showAveragedSensors) {
    let url = null;
    if (showAveragedSensors === true)
      url = 'ws://' + window.location.host + '/temperatures/live/average';
    else
      url = 'ws://' + window.location.host + '/temperatures/live';
    return url;
  }

  onSocketOpen() { }
  
  onSocketData(message) {
    let latest = JSON.parse(message.data);
    this.setState({
      loading: false,
      measurements: latest.measurements.sort(function (a, b) {
        if (a.host < b.host) return -1;
        if (a.host > b.host) return 1;
        return 0;
      })
    });
  }

  onSocketClose() { }
}

export default LiveTemperatures;