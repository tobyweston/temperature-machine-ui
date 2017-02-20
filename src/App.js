import React, { Component } from 'react';
import Temperatures from './Temperatures';
import Band from './Band';
import StaticCharts from './StaticCharts';
import { Jumbotron, Grid, Col } from 'react-bootstrap';
import DynamicChart from './DynamicChart';

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
              <DynamicChart/>
            </Col>
          </Grid>
        </Jumbotron>

        <StaticCharts />

      </div>
    );
  }
}

export default App;
