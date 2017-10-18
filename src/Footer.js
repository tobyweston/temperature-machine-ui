import React from 'react';
import {Link} from 'react-router-dom';
import './css/footer.css';

class Footer extends React.Component {
  
  render() {
    return (
        <footer>
          <hr/>
          <span className="copyright">&copy; 2016-2017 toby weston, <a href="http://temperature-machine.com">temperature-machine.com</a></span>
          <span className="logs-link"><Link to="logs">View the logs</Link></span>
        </footer>
    )
  }

}

export default Footer;