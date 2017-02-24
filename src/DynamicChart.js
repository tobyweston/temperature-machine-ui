import React from "react";
import axios from "axios";
import {Line} from "react-chartjs-2";

class DynamicChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

    return <div>
      <Line data={this.state.chartData} options={options}/>
    </div>
  }

  fetchJson() {
    axios.get('http://localhost:11900/temperature.json')
        .then(response => {
          this.setState({
            loading: false,
            chartData: {
              datasets: response.data
            }
          });
        })
        .catch(error => {
          this.setState({
            loading: false
          })
        });
  }

}

export default DynamicChart;
