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
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Temperature (°C)'
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              hour: 'hh:mm'
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
    const colors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'];

    axios.get('http://localhost:11900/temperature.json')
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            chartData: {
              datasets: response.data.map((dataset, index) =>
                  Object.assign({}, dataset, {
                    fill: false,
                    radius: 0,
                    spanGaps: false,
                    borderColor: colors[index],
                    backgroundColor: colors[index]
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
