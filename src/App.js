import React, { Component } from 'react';
import Temperatures from './Temperatures';
import Band from './Band';
import StaticCharts from './StaticCharts';
import { Jumbotron, Grid, Col } from 'react-bootstrap';

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
              <p className="lead">Last 24 Hours</p>
              <div className="row" id="chart-img"></div>
            </Col>
          </Grid>
        </Jumbotron>

        <StaticCharts />

      </div>
    );
  }
}

export default App;
