import React, {Component} from 'react';
import './css/select-average.css';
import 'font-awesome/css/font-awesome.min.css';

class ShowAveragedSensors extends Component {

  render() {
    return (
      <div className='selection'>
        <a className='bm-item-selection averaged' href='' onClick={ event => this.averaged(event) }><i className={ this.isSelected(this.props.showAveragedSensors) } aria-hidden='true'/><span>Averaged</span></a>
        <a className='bm-item-selection all_sensors' href='' onClick={ event => this.allSensors(event) }><i className={ this.isSelected(!this.props.showAveragedSensors) } aria-hidden='true'/><span>All sensors</span></a>
      </div>
    );
  }

  isSelected(value) {
    return value ? 'fa fa-check-square-o' : 'fa fa-square-o';
  }
  
  averaged(event) {
    event.preventDefault();
    this.props.onToggleShowAveragedSensors(true);
  }

  allSensors(event) {
    event.preventDefault();
    this.props.onToggleShowAveragedSensors(false);
  }
}

export default ShowAveragedSensors;
