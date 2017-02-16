import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ImageLoader from 'react-imageloader';
import Spinner from './Spinner';

class StaticCharts extends React.Component {

  constructor(props) {
    super(props);
    this.server = "http://localhost:11900/";
  }

  preloader() {
    return <Spinner/>
  }

  render() {
    const imagePros = {
      width: "320",
      height: "160",
      role: "presentation"
    }

    return (
      <Grid>
        <Row>
          <Col md={4}>
            <p className="lead">24 Hours</p>
            <ImageLoader src={this.server + "temperature-1-days.png"} imgProps={imagePros} wrapper={React.DOM.div} preloader={this.preloader}>
              Image unavailable
            </ImageLoader>
          </Col>
          <Col md={4}>
            <p className="lead">7 Days</p>
            <ImageLoader src={this.server + "temperature-7-days.png"} imgProps={imagePros} wrapper={React.DOM.div} preloader={this.preloader}>
              Image unavailable
            </ImageLoader>
          </Col>
          <Col md={4}>
            <p className="lead">1 Month</p>
            <ImageLoader src={this.server + "temperature-30-days.png"} imgProps={imagePros} wrapper={React.DOM.div} preloader={this.preloader}>
              Image unavailable
            </ImageLoader>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default StaticCharts;
