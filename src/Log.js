import React, {Component} from 'react';
import Spinner from './Spinner';
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
      element = <pre className="log-error">{ this.state.error.toString() }</pre>;
    else
      element = <pre className="log-data">{this.state.log}</pre>;


    return (
        <div className="log">
          { element }
        </div>
    );
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
}

export default Log;
