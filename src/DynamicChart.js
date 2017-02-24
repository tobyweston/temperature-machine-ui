import React from "react";
import axios from "axios";
import {Line} from "react-chartjs-2";
import Spinner from './Spinner';

class DynamicChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      chartData: {
        datasets: [ ]
      },
    }
  }

  componentDidMount() {
    this.fetchJson();
  }

  render() {
    const options = {
      spanGaps: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              quarter: 'HH:mm'
            }
          }
        }]
      }
    };

    let element = null;
    if (this.state.loading === true)
      element = <Spinner/>;
    else if (this.state.error)
      element = <pre>{ this.state.error.toString() }</pre>
    else
      element = <Line data={ this.state.chartData } options={options}/>

    return <div>
      { element }
    </div>
  }

  fetchJson() {
    axios.get('http://localhost:11900/temperature.json')
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            chartData: {
              datasets: response.data.map(dataset =>
                  Object.assign({}, dataset, {
                    fill: false,
                    radius: 0
                  })
              )
            }
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

export default DynamicChart;
