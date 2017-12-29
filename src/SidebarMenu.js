import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';
import {Link} from 'react-router-dom';
import SelectAveragedTemperatures from "./SelectAveragedTemperatures";
import './css/burger.css';
import 'font-awesome/css/font-awesome.min.css';

class SidebarMenu extends Component {

  render() {
    return (
      <Menu>
        { this.renderHref('/', '', <i className='fa fa-thermometer-half' aria-hidden='true'/>, 'Temperatures')}
        <SelectAveragedTemperatures/>
        <Link to='logs'><i className="fa fa-archive"/><span>Logs</span></Link>
        { this.renderHref('http://temperature-machine.com', '_blank', <i className='fa fa-file-text-o' aria-hidden='true'/>, 'Documentation')}
        { this.renderHref('http://github.com/tobyweston/temperature-machine', '_blank', <i className='fa fa-github-alt' aria-hidden='true'/>, 'Github')}
      </Menu>
    );
  }

  renderHref(url, target, icon, text) {
    return <a href={ url } target={ target }>{ icon }<span>{ text }</span></a>
  }
}

export default SidebarMenu;
