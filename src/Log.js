import React, {Component} from 'react';
import Spinner from './Spinner';
import Refresh from './Refresh';
import axios from "axios";
import moment from 'moment';
import './css/logs.css';

class Log extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      error: null,
      log: null
    }
  }
  
  render() {

    let element = null;
    if (this.state.loading === true)
      element = <Spinner/>;
    else if (this.state.error)
      element = this.renderError();
    else
      element = this.renderLog();


    return (
        <div className="log">
          { element }
        </div>
    );
  }

  renderError() {
    return <pre className="log-error">
      <Refresh refresh={ (event) => this.refresh(event) }/>
      <span>{ this.state.error.toString() }</span>
    </pre>;
  }

  renderLog() {
    return <pre className="log-data">
      <Refresh refreshing={ this.state.refreshing } refresh={ (event) => this.refresh(event) }/>
      { 
        this.state.log.map((value, index) => {
          let time = moment(value.time);
          return <div key={ index } className='log-row'>
            <span className='time'>{ time.format("ddd DD-MMM-YYYY") }</span>
            <span className='hours'>{ time.format("HH:mm:ss") }</span>
            <span className='millis'>{ time.format(".SSS") }</span>
            <span className='thread'>{ value.thread }</span>
            <span className={ 'level ' + value.level.toLowerCase() }>{ value.level }</span>
            <span className='message'>{ value.message }</span>
          </div>
        })
      }
    </pre>;
  }

  componentDidMount() {
    this.fetchLog();
  }
  
  fetchLog() {
    let url = 'http://' + this.props.host + ':11900/log';
    axios.get(url)
        .then(response => {
          this.setState({
            loading: false,
            refreshing: false,
            error: null,
            log: response.data
          })
        })
        .catch(error => {
          this.setState({
            loading: false,
            refreshing: false,
            error: error
          })
        });
  }

  refresh(event) {
    this.setState({
      refreshing: true
    });
    event.preventDefault();
    this.fetchLog();
  }
}

export default Log;
