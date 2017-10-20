import React from 'react';
import ImageLoader from 'react-imageloader';
import Spinner from './Spinner';

class RrdChart extends React.Component {
  
  preloader() {
    return <Spinner/>
  }

  render() {
    const imagePros = {
      width: "320",
      height: "160",
      role: "presentation"
    };

    return <div>
      <p className="lead">{this.props.label}</p>
      <a href={this.props.file}>
        <ImageLoader src={this.props.file} imgProps={imagePros} wrapper={React.DOM.div} preloader={this.preloader}>
          Image unavailable
        </ImageLoader>
      </a>
    </div>
  }

}

export default RrdChart;
