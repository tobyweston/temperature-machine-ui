import React from 'react';

import './css/spinner.css';

class Spinner extends React.Component {

  render() {
    return <div><img className="spinner" src="/images/spinner.gif" role="presentation"/></div>
  }

}

export default Spinner;