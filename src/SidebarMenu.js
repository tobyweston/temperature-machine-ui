import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';
import {Link} from 'react-router-dom';
import ToggleShowAveragedSensors from "./ToggleShowAveragedSensors";
import './css/burger.css';
import 'font-awesome/css/font-awesome.min.css';

class SidebarMenu extends Component {

  constructor (props) {
    super(props);
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange(state) {
    this.setState({menuOpen: state.isOpen})
  }
  
  render() {
    return (
      <Menu isOpen={ this.state.menuOpen } onStateChange={ (state) => this.handleStateChange(state) }>
        <Link onClick={ () => this.closeMenu() } to=''><i className="fa fa-thermometer-half"/><span>Temperatures</span></Link>
        <ToggleShowAveragedSensors showAveragedSensors={ this.props.showAveragedSensors } onToggleShowAveragedSensors={ this.props.onToggleShowAveragedSensors } />
        <Link onClick={ () => this.closeMenu() } to='logs'><i className="fa fa-archive"/><span>Logs</span></Link>
        <Link onClick={ () => this.closeMenu() } to='connections'><i className="fa fa-plug"/><span>Live Connections</span></Link>
        { this.renderHref('http://temperature-machine.com/docs', '_blank', <i className='fa fa-file-text-o' aria-hidden='true'/>, 'Documentation')}
        { this.renderHref('http://github.com/tobyweston/temperature-machine', '_blank', <i className='fa fa-github-alt' aria-hidden='true'/>, 'Github')}
        { this.renderHref('http://' + window.location.hostname + ':11900/temperatures.csv', '', <i className='fa fa-cloud-download' aria-hidden='true'/>, 'Export CSV')}
      </Menu>
    );
  }

  renderHref(url, target, icon, text) {
    return <a href={ url } target={ target }>{ icon }<span>{ text }</span></a>
  }

  closeMenu () {
    this.setState({ menuOpen: false })
  }

}

export default SidebarMenu;
