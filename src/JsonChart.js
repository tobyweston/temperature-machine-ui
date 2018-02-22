import React from "react";
import axios from "axios";
import {Line} from "react-chartjs-2";
import Spinner from './Spinner';
import Refresh from './Refresh';
import moment from 'moment-timezone';
// import TimezonePicker from 'react-timezone';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import './css/dynamicchart.css';


class JsonChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
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
    let timezone = this.props.timezone;
    const options = {
      spanGaps: false,
      legend: {
        position: 'bottom'
      },
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
              hour: 'H:mm'
            }
          }, 
          ticks: {
            callback: function(value, index, values) {
              if (!values[index]) {
                return
              }
              return moment.utc(values[index]['value']).tz(timezone).format('H:mm');
            }
          }
        }]
      },
      tooltips: {
        mode: 'index',
        callbacks: {
          title: function(tooltipItem, data) {
            return moment(tooltipItem[0].xLabel).format("ddd, H:mm");
          },
          label: function(tooltipItem, data) {
            return ' ' + data.datasets[tooltipItem.datasetIndex].label + ' ' + Math.round(tooltipItem.yLabel * 100) / 100 + ' °C';
          }
        }
      }
    };

    let element = null;
    if (this.state.loading === true)
      element = <Spinner/>;
    else if (this.state.error)
      element = <pre>{ this.state.error.toString() }</pre>;
    else
      element = <Line data={ this.state.chartData } options={ options } redraw={ true } />;

    return <div>
      <div className="chart-heading">
        <p>Last 24 Hours</p><Refresh refreshing={ this.state.refreshing } refresh={ (event) => this.refreshChart(event) }/>
        <TimezonePicker className='timezone'
            absolute={ true }
            defaultValue={ this.props.timezone }
            placeholder="Select timezone..."
            onChange={this.props.onTimezoneChange}
        />
      </div>
      <div className="chart-area">
        { element }
      </div>
    </div>
  }

  fetchJson() {
    const colors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'];

    axios.get('/temperature.json')
        .then(response => {
          this.setState({
            loading: false,
            refreshing: false,
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
            refreshing: false,
            error: error
          })
        });
  }

  refreshChart(event) {
    this.setState({
      refreshing: true
    });
    event.preventDefault();
    this.fetchJson();
  }
}

export default JsonChart;
