import React, {Component} from 'react';
import Temperatures from './Temperatures';
import RrdCharts from './RrdCharts';
import Footer from './Footer';
import {Col, Grid, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import JsonChart from './JsonChart';
import SidebarMenu from './SidebarMenu';

class Home extends Component {

  constructor(props) {
    super(props);
    this.onToggleShowAveragedSensors = this.onToggleShowAveragedSensors.bind(this); // voodoo
    this.state = {
      showAveragedSensors: true
    };
  }
    
  render() {
    return (
        <div>
          <SidebarMenu showAveragedSensors={ this.state.showAveragedSensors } onToggleShowAveragedSensors={ this.onToggleShowAveragedSensors }/>
          <Jumbotron>
            <Grid>
              <Col md={3}>
                <Temperatures showAveragedSensors={ this.state.showAveragedSensors }/>
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
  
  onToggleShowAveragedSensors(value) {
    this.setState({
      showAveragedSensors: value
    })
  }
}

export default Home;
