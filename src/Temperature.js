import React from 'react';
import axios from 'axios';
import moment from 'moment';

class Temperature extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      measurements: []
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.getCurrentTemperatures();
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let temperatures = this.state.measurements.map(measurement => {
      let celsius = Math.round(measurement.sensors[0].temperature.celsius * 10) / 10;
      let lastUpdate = moment.unix(measurement.seconds).format('ddd HH:mm a');
      return <div className="temperature">
        <h1><span className="temperature">{ celsius } °C</span></h1>
        <p className="source">{ measurement.host }</p>
        <span className="updated small">updated: { lastUpdate }</span>
      </div>;
    });

    return <div>{ temperatures }</div>
  }

  getCurrentTemperatures() {
    axios.get('http://localhost:11900/temperatures/average')
      .then(response => {
        this.setState({
          measurements: response.data.measurements
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

}

export default Temperature;
