import React, {Component} from 'react';
import Temperatures from './Temperatures';
import Band from './Band';
import RrdCharts from './RrdCharts';
import Logs from './Logs';
import {Jumbotron, Grid, Col} from 'react-bootstrap';
import JsonChart from './JsonChart';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './css/app.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Band/>

            <Route exact="true" path="/" render={() => (
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
            )}/>

            <Route path="/logs" component={Logs}/>

            <hr/>
            <footer>
              <span className="copyright">&copy; 2016-2017 toby weston, <a href="http://temperature-machine.com">temperature-machine.com</a></span>
              <span className="logs-link"><Link to="logs">View the logs</Link></span>
            </footer>

          </div>
        </Router>
    );
  }
}

export default App;
