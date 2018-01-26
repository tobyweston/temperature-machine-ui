import React from "react";
import './css/temperature.css';

class Temperature extends React.Component {

  render() {
    const temperatures = this.props.sensors.map(sensor => {
      return this.renderTemperature(sensor, this.props.sensors.length);
    });
    return <div>{ temperatures }</div>
  }

  renderTemperature(sensor, numberOfSensors) {
    const celsius = Math.round(sensor.temperature.celsius * 10) / 10;
    const source = this.props.source;
    return <div key={sensor.name}>
      <span className={ 'temperature ' + source }>{ celsius }</span> <span className='scale'>°C</span>
      <p className={ 'source ' + source }>{ source } { numberOfSensors > 1 && <span className='sensor'>({ sensor.name })</span> } </p>
    </div>;

  }
}

export default Temperature;
