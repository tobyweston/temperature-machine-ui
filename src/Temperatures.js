import React from 'react';
import axios from 'axios';
import Temperature from './Temperature'
import Spinner from './Spinner';

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
    this.timerId = setInterval(() => {
      this.fetchCurrentTemperatures();
    }, 1000)
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

    return <div><p className="lead">Current Temperature</p>{ element }</div>
  }

  renderError(error) {
    return <span>{ error.toString() }</span>
  }

  renderTemperatures(measurements) {
    return <div> {
      measurements.map(measurement => {
        return <Temperature key={measurement.host} celsius={measurement.sensors[0].temperature.celsius} lastUpdate={measurement.seconds} source={measurement.host} />
      })
    } </div>;
  }

  fetchCurrentTemperatures() {
    axios.get('http://localhost:11900/temperatures/average')
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

}

export default Temperatures;
