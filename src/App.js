import React, { Component } from 'react';
import Temperatures from './Temperatures';
import Band from './Band';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

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

        <Grid>
          <Row>
            <Col md={4}>
              <p className="lead">24 Hours</p>
              <a href="http://localhost:11900/temperature-1-days.png"><img role="presentation" src="http://localhost:11900/temperature-1-days.png" width="320" height="160"/></a>
            </Col>
            <Col md={4}>
              <p className="lead">7 Days</p>
              <a href="http://localhost:11900/temperature-7-days.png"><img role="presentation" src="http://localhost:11900/temperature-7-days.png" width="320" height="160"/></a>
            </Col>
            <Col md={4}>
              <p className="lead">1 Month</p>
              <a href="http://localhost:11900/temperature-30-days.png"><img role="presentation" src="http://localhost:11900/temperature-30-days.png" width="320" height="160"/></a>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default App;
