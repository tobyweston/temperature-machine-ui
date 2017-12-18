import React, {Component} from 'react';
import Temperatures from './Temperatures';
import RrdCharts from './RrdCharts';
import Footer from './Footer';
import {Col, Grid, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import JsonChart from './JsonChart';
import SidebarMenu from './SidebarMenu';

class Home extends Component {

  render() {
    return (
        <div>
          <SidebarMenu/>
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

          <Footer link={<Link to='logs'>View the logs</Link>}/>
        </div>
    );
  }
}

export default Home;
