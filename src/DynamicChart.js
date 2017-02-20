import React from 'react';
import axios from 'axios';

class DynamicChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lastResponse: "Unable to retrieve source data"
    }
  }

  componentDidMount() {
    this.fetchXml();
  }

  render() {
    return <div>
      <pre>{this.state.lastResponse}</pre>
    </div>
  }

  fetchXml() {
    axios.get('http://localhost:11900/temperature.xml')
      .then(response => {
        this.setState({
          loading: false,
          lastResponse: response.data
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          lastResponse: error.toString()
        })
      });
  }

}

export default DynamicChart;
