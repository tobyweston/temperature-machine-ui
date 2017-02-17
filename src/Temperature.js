import React from 'react';
import moment from 'moment';

class Temperature extends React.Component {

  render() {
    const temperatures = this.props.sensors.map(sensor => {
      return this.renderTemperature(sensor);
    });
    return <div>{ temperatures }</div>
  }

  renderTemperature(sensor) {
    const celsius = Math.round(sensor.temperature.celsius * 10) / 10;
    const lastUpdate = moment.unix(this.props.lastUpdate).format('ddd HH:mm a');
    return <div className="temperature" key={sensor.name}>
      <h1><span className="temperature">{ celsius } °C</span></h1>
      <p className="source">{ this.props.source } <span className="small">({ sensor.name.toLowerCase() })</span></p>
      <span className="small">updated: { lastUpdate }</span>
    </div>;

  }
}

export default Temperature;
