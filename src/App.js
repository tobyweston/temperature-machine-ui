import React, { Component } from 'react';
import Temperatures from './Temperatures';
import Band from './Band';
import RrdCharts from './RrdCharts';
import { Jumbotron, Grid, Col } from 'react-bootstrap';
import JsonChart from './JsonChart';
import './css/app.css';

class App extends Component {
  render() {
    return (
      <div>

        <Band />

        <Jumbotron>
          <Grid>
            <Col md={3}>
              <Temperatures />
            </Col>
            <Col md={9}>
              <JsonChart />
            </Col>
          </Grid>
        </Jumbotron>

        <RrdCharts />

        <hr/>

        <footer>
            <span className="copyright">&copy; 2016-2017 toby weston, <a href="http://temperature-machine.com">temperature-machine.com</a></span>
            <span className="logs-link"><a href="temperature-machine.log">View the logs</a></span>
        </footer>

      </div>
    );
  }
}

export default App;
