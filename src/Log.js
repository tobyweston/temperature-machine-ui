import React, {Component} from 'react';
import Spinner from './Spinner';
import Refresh from './Refresh';
import axios from "axios";
import './css/logs.css';

class Log extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      <Refresh refresh={ (event) => this.refresh(event) }/>
      <span>{ this.state.log }</span>
    </pre>;
  }

  componentDidMount() {
    this.fetchLog();
  }
  
  fetchLog() {
    let url = 'http://' + this.props.host + ':11900/temperature-machine.log';
    axios.get(url)
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            log: response.data
          })
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: error
          })
        });
  }

  refresh(event) {
    event.preventDefault();
    this.fetchLog();
  }
}

export default Log;
