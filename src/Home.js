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
      showAveragedSensors: true,
      forceRefresh: false
    };
  }

  render() {
    return (
        <div className='home main'>
          <SidebarMenu showAveragedSensors={this.state.showAveragedSensors} onToggleShowAveragedSensors={this.onToggleShowAveragedSensors}/>
          <Jumbotron>
            <Grid>
              <Col md={3}>
                <Temperatures showAveragedSensors={this.state.showAveragedSensors} forceRefresh={this.state.forceRefresh}/>
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

  onToggleShowAveragedSensors(newValue) {
    if (this.state.showAveragedSensors !== newValue) {
      this.setState({
        showAveragedSensors: newValue,
        forceRefresh: true
      }, () => {
        // a callback run after setState is applied (attempt to toggle and force a refresh without spinning)
        this.setState({
          forceRefresh: false
        })
      })
    }
  }
}

export default Home;
