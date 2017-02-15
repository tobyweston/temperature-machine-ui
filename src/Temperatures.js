import React from 'react';
import axios from 'axios';

class Temperature extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      measurements: []
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.fetchCurrentTemperatures();
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const element = this.state.error ? this.renderError(this.state.error) : this.renderTemperatures(this.state.measurements);

    return <div><p className="lead">Current Temperature</p>{ element }</div>
  }

  renderError(error) {
    return <span>{ error.toString() }</span>
  }

  renderTemperatures(measurements) {
    return <div> {
      measurements.map(measurement => {
        return <Temperature celsius={measurements.sensors[0].temperature.celsius} lastUpdate={measurement.seconds} source={measurement.host} />
      })
    } </div>;
  }

  fetchCurrentTemperatures() {
    axios.get('http://localhost:11900/temperatures/average')
      .then(response => {
        this.setState({
          measurements: response.data.measurements
        });
      })
      .catch(error => {
        this.setState({
          error: error
        })
      });
  }

}

export default Temperature;
