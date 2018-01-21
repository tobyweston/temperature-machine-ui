import React, {Component} from 'react';
import axios from "axios";

// import './css/version.css';

class Version extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      buildInfo: null
    }
  }

  render() {

    let element = null;
    if (this.state.loading)
      element = null;
    else if (this.state.error)
      element = this.renderError();
    else
      element = this.renderVersion();


    return (
      <div className="version text-muted">
        { element }
      </div>
    );
  }

  renderError() {
    return <span className='version-error'>unknown version</span>
  }

  renderVersion() {
    return <span>v{ this.state.buildInfo.version } ({ this.state.buildInfo.latestSha })</span>
  }

  componentDidMount() {
    this.fetchVersion();
  }

  fetchVersion() {
    let url = 'http://' + this.props.host + ':11900/version';
    axios.get(url)
        .then(response => {
          this.setState({
            loading: false,
            error: null,
            buildInfo: response.data
          })
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: error
          })
        });
  }

}

export default Version;
