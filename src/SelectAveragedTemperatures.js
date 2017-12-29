import React, {Component} from 'react';
import './css/select-average.css';
import 'font-awesome/css/font-awesome.min.css';

class SelectAveragedTemperatures extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAveragedSensors: true
    };
  }
  
  render() {
    return (
      <div className='selection'>
        <a className='bm-item-selection' href='' onClick={ event => this.averaged(event) }><i className={ this.isSelected(this.state.showAveragedSensors) } aria-hidden='true'/><span>Averaged</span></a>
        <a className='bm-item-selection' href='' onClick={ event => this.allSensors(event) }><i className={ this.isSelected(!this.state.showAveragedSensors) } aria-hidden='true'/><span>All sensors</span></a>
      </div>
    );
  }

  isSelected(value) {
    return value ? 'fa fa-check-square-o' : 'fa fa-square-o';
  }
  
  averaged(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showAveragedSensors: true
    }));
  }

  allSensors(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showAveragedSensors: false
    }));
  }
}

export default SelectAveragedTemperatures;
