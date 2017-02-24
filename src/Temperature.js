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
    return <div className="temperature" key={sensor.name}>
      <h1><span className="temperature">{ celsius } °C</span></h1>
      <p className="source">{ this.props.source } <span className="small">({ sensor.name.toLowerCase() })</span></p>
    </div>;

  }
}

export default Temperature;
