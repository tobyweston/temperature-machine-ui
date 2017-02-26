import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import RrdChart from './RrdChart';

class RrdCharts extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <RrdChart label="24 Hours" file="temperature-1-days.png"/>
          </Col>
          <Col md={4}>
            <RrdChart label="7 Days" file="temperature-7-days.png"/>
          </Col>
          <Col md={4}>
            <RrdChart label="1 Month" file="temperature-30-days.png"/>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default RrdCharts;
