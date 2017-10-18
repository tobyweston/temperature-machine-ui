import React, {Component} from 'react';
import Temperatures from './Temperatures';
import RrdCharts from './RrdCharts';
import {Col, Grid, Jumbotron} from 'react-bootstrap';
import JsonChart from './JsonChart';

class Home extends Component {

  render() {
    return (
        <div>
          <Jumbotron>
            <Grid>
              <Col md={3}>
                <Temperatures/>
              </Col>
              <Col md={9}>
                <JsonChart/>
              </Col>
            </Grid>
          </Jumbotron>

          <RrdCharts/>
        </div>
    );
  }
}

export default Home;
