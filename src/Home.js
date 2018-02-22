import React, {Component} from 'react';
import Temperatures from './Temperatures';
import RrdCharts from './RrdCharts';
import Footer from './Footer';
import {Col, Grid, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import JsonChart from './JsonChart';

class Home extends Component {

  render() {
    return (
        <div className='home main'>
          <Jumbotron>
            <Grid>
              <Col md={3}>
                <Temperatures showAveragedSensors={this.props.showAveragedSensors} forceRefresh={this.props.forceRefresh}/>
              </Col>
              <Col md={9}>
                <JsonChart timezone={ this.props.timezone } onTimezoneChange={ this.props.onTimezoneChange }/>
              </Col>
            </Grid>
          </Jumbotron>

          <RrdCharts/>

          <Footer link={<Link to='logs'>View the logs</Link>}/>
        </div>
    );
  }
}

export default Home;
