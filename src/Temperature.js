import React from 'react';
import moment from 'moment';

class Temperature extends React.Component {

  render() {
    const celsius = Math.round(this.props.celsius * 10) / 10;
    const lastUpdate = moment.unix(this.props.lastUpdate).format('ddd HH:mm a');
    return <div className="temperature">
      <h1><span className="temperature">{ celsius } °C</span></h1>
      <p className="source">{ this.props.source }</p>
      <span className="updated small">updated: { lastUpdate }</span>
    </div>;
  }

}

export default Temperature;
