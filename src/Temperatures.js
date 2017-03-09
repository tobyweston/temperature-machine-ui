import React from 'react';
import axios from 'axios';
import Temperature from './Temperature'
import Spinner from './Spinner';
import './css/temperatures.css';

class Temperatures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAveragedSensors: true,
      loading: true,
      error: null,
      measurements: []
    }
  }

  componentDidMount() {
    // this.fetchCurrentTemperatures(); // initialise?

    this.timerId = setInterval(() => {
      this.fetchCurrentTemperatures();
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let element = null;
    if (this.state.loading === true)
      element = <Spinner/>;
    else if (this.state.error)
      element = this.renderError(this.state.error);
    else
      element = this.renderTemperatures(this.state.measurements);

    return <div>
      <div className="temperatures-heading">
        <p>Current Temperature</p><a className="link" href="" onClick={(event) => { this.toggleAveraging(event) }}>{this.toggleString()}</a>
      </div>
      <div className="temperatures-area">
        { element }
      </div>
    </div>
  }

  renderError(error) {
    return <pre>{ error.toString() }</pre>
  }

  renderTemperatures(measurements) {
    return <div> {
      measurements.map(measurement => {
        return <Temperature key={measurement.host} sensors={measurement.sensors} lastUpdate={measurement.seconds} source={measurement.host} />
      })
    } </div>;
  }

  fetchCurrentTemperatures() {
    let url = null;
    if (this.state.showAveragedSensors === true)
      url = '/temperatures/average';
    else
      url = '/temperatures';

    axios.get(url)
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            measurements: response.data.measurements
          });
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: error
          })
        });
  }

  toggleString() {
    return this.state.showAveragedSensors ? 'all sensors' : 'average';
  }

  toggleAveraging(event) {
    event.preventDefault();
    this.setState((previous, props) => ({
      showAveragedSensors: !previous.showAveragedSensors
    }), () => {
      this.fetchCurrentTemperatures(); // a callback run after setState is applied
    });
  }

}

export default Temperatures;
