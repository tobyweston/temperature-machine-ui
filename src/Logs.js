import React, {Component} from 'react';
import Footer from './Footer';
import Spinner from './Spinner';
import {Link} from 'react-router-dom';
import axios from "axios";
import './css/logs.css';

class Logs extends Component {
  
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
      element = <pre>{ this.state.error.toString() }</pre>;
    else
      element = 
        <div className="log">
          <pre className="log-data">{ this.state.log }</pre>
        </div>;


    return (
        <div>
          <h1>Logs</h1>
          { element }
          <Footer link={<Link to="/">View the temperatures</Link>}/>
        </div>
    );
  }

  componentDidMount() {
    this.fetchLog();
  }
  
  fetchLog() {
    axios.get('/temperature-machine.log')
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

export default Logs;
