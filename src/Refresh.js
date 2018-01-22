import React from 'react';

class Refresh extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  
  render() {
    let spin = null;
    spin = this.state.loading === true ? "fa-spin" : "";
    
    return <a className="link"  href="" onClick={(event) => {
      this.setState({
        loading: true
      });
      this.props.refresh(event)(this.onComplete())
    }}><i className={ "fa fa-refresh " + spin } aria-hidden="true"/></a>;
  }
 
  onComplete() {
    return () => this.setState({
      loading: false
    });
  }
  

}

export default Refresh;