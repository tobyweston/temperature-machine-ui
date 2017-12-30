import React from 'react';
import axios from 'axios';
import Temperature from './Temperature'
import Spinner from './Spinner';
import './css/temperatures.css';

class Temperatures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      measurements: []
    }
  }

  componentDidMount() {
    this.fetchCurrentTemperatures();

    this.timerId = setInterval(() => {
      this.fetchCurrentTemperatures();
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    this.possiblyForceRefresh();
    
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

  possiblyForceRefresh() {
    if (this.props.forceRefresh) {
      this.fetchCurrentTemperatures();
    }
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
    let url = this.getUrl(this.props.showAveragedSensors);

    axios.get(url)
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            measurements: response.data.measurements.sort(function(a, b) {
              if (a.host < b.host) return -1;
              if (a.host > b.host) return 1;
              return 0;
            })
          });
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: error
          })
        });
  }

  getUrl(showAveragedSensors) {
    let url = null;
    if (showAveragedSensors === true)
      url = '/temperatures/average';
    else
      url = '/temperatures';
    return url;
  }
}

export default Temperatures;
