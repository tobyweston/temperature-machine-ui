import React, {Component} from 'react';
import Spinner from './Spinner';
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import {Col, Row} from 'react-bootstrap';

import './css/connections.css';

class Connections extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      connections: [],
      version: null
    }
  }

  render() {
    return this.renderLayout(this.renderLoadingErrorOrContent());
  }

  renderLayout(element) {
    return <div className='connections-component'>
      <SidebarMenu/>
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
      element = this.renderBody();
    return element;
  }

  renderBody() {
    return <div>
      { this.renderConnections() }
      { this.renderVersionInfo() }
    </div>
  }
  
  renderConnections() {
    return <div>
      <Row>
        <Col md={12}>
          <h1>Live Connections</h1>
        </Col>
      </Row>

      <div className='main'>
        <p>Connections active in the last 5 minutes.</p>
        <table>
          <tbody>
          {
            this.state.connections.map((value, index) => {
              return <tr key={index}>
                <td>{value.host.name}</td>
                <td>{value.ip.value}</td>
              </tr>;
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  }

  renderVersionInfo() {
    return <div>
      <Row>
        <Col md={12}>
          <h1>Server Info</h1>
        </Col>
      </Row>

      <div className='main'>
        <table>
          <tbody>
            <tr>
              <td>version</td>
              <td>{this.state.version.version} ({this.state.version.latestSha})</td>
            </tr>
            <tr>
              <td>scala version</td>
              <td>{this.state.version.scalaVersion}</td>
            </tr>
            <tr>
              <td>sbt version</td>
              <td>{this.state.version.sbtVersion}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  }


  componentDidMount() {
    this.fetchConnections();
  }

  getConnections() {
    return axios.get('/connections')
  }

  getServerVersion() {
    return axios.get('/version')
  }

  fetchConnections() {
    let that = this; // i have no idea why I need this
    axios.all([this.getConnections(), this.getServerVersion()])
        .then(axios.spread(function (connections, version) {
              that.setState({
                loading: false,
                error: null,
                connections: connections.data,
                version: version.data
              });
            }
        ))
        .catch(error => {
          console.log(error)
          this.setState({
            loading: false,
            error: error
          });
        });
  }

}

export default Connections;
