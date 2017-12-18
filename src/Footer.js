import React from 'react';
import './css/footer.css';

class Footer extends React.Component {
  
  render() {
    return (
        <footer>
          <hr/>
          <span className="copyright">&copy; 2016-2017 toby weston, <a href="http://temperature-machine.com" target="_blank">temperature-machine.com</a></span>
          <span className="link">{this.props.link}</span>
        </footer>
    )
  }

}

export default Footer;