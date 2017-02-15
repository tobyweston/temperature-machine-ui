import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class StaticCharts extends React.Component {

  server = "http://localhost:11900/";

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <p className="lead">24 Hours</p>
            <a href={this.server + "temperature-1-days.png"}><img role="presentation" src={this.server + "temperature-1-days.png"} width="320" height="160"/></a>
          </Col>
          <Col md={4}>
            <p className="lead">7 Days</p>
            <a href={this.server + "temperature-7-days.png"}><img role="presentation" src={this.server + "temperature-7-days.png"} width="320" height="160"/></a>
          </Col>
          <Col md={4}>
            <p className="lead">1 Month</p>
            <a href={this.server + "temperature-30-days.png"}><img role="presentation" src={this.server + "temperature-30-days.png"} width="320" height="160"/></a>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default StaticCharts;
