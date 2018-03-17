import React from "react";
import './css/temperature.css';

class Temperature extends React.Component {

  render() {
    const temperatures = this.props.sensors.map((sensor, index) => {
      return this.renderTemperature(sensor, this.props.sensors.length, index);
    });
    return <div>{ temperatures }</div>
  }

  renderTemperature(sensor, numberOfSensors, index) {
    const celsius = Math.round(sensor.temperature.celsius * 10) / 10;
    const source = this.props.source;
    return <div key={sensor.name + '-' + index}>
      <span className={ 'temperature ' + source.name }>{ celsius }</span> <span className='scale'>°C</span>
      <p className={ 'source ' + source.name }>{ source.name } { numberOfSensors > 1 && <span className='sensor'>({ sensor.name })</span> } </p>
      </div>;

  }
}

export default Temperature;
