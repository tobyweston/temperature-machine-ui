import React from 'react';
import { Glyphicon } from 'react-bootstrap';

class Refresh extends React.Component {

  render() {
    return <a className="link" href="" onClick={(event) => {
      this.props.refresh(event)
    }}><Glyphicon glyph="refresh"/></a>;
  }

}

export default Refresh;