import React, {Component} from 'react';
import Log from './Log';
import Footer from './Footer';
import Spinner from './Spinner';
import {Link, NavLink, Route} from 'react-router-dom';
import axios from "axios";
import {Col, Row} from 'react-bootstrap';


import './css/logs.css';

class Logs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      connections: []
    }
  }

  render() {
    return this.renderLayout(this.renderLoadingErrorOrContent());
  }

  renderLayout(element) {
    return <div className='logs-component'>
      {element}
    </div>
  }
  
  renderLoadingErrorOrContent() {
    let element = null;
    if (this.state.loading === true)
      element = <Spinner/>;
    else if (this.state.error)
      element = <pre className="error">{this.state.error.toString()}</pre>;
    else
      element = this.renderLogs();
    return element;
  }

  renderLogs() {
    return <div>
      <Row>
        <Col md={12}>
          <h1>Logs</h1>
        </Col>
      </Row>
      
      { this.renderLinks() }
      { this.renderRoutes() }
      
      <Footer link={<Link to='/'>View the temperatures</Link>}/>
    </div>
  }

  renderLinks() {
    return <ul>
      {
        this.state.connections.map((value, index) => {
          let path = '/logs/' + value.host.name.toLowerCase();
          let link = value.host.name[0].toUpperCase() + value.host.name.substr(1);
          return <li key={index}><NavLink title={ value.ip.value } activeClassName='active' to={ path }>{ link }</NavLink></li>;
        })
      }
    </ul>;
  }

  renderRoutes() {
    return <div>
      {
        this.state.connections.map((value, index) => {
          let path = '/logs/' + value.host.name.toLowerCase();
          return <Route key={ value.host.name } path={ path } render={ () => {
            return <Log host={ value.ip.value } />;
          }}/>;
        })
      }
    </div>;
  }

  componentDidMount() {
    this.fetchConnections();
  }

  fetchConnections() {
    axios.get('/connections/active/within/5/mins')
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            connections: response.data
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
