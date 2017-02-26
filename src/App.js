import React, { Component } from 'react';
import Temperatures from './Temperatures';
import Band from './Band';
import StaticCharts from './StaticCharts';
import { Jumbotron, Grid, Col } from 'react-bootstrap';
import DynamicChart from './DynamicChart';
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
              <DynamicChart/>
            </Col>
          </Grid>
        </Jumbotron>

        <StaticCharts />

        <hr/>

        <footer>
          <p>&copy; 2016-2017 <a href="https://github.com/tobyweston/temperature-machine">toby weston</a></p>
        </footer>

      </div>
    );
  }
}

export default App;
