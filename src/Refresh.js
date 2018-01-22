import React from 'react';

class Refresh extends React.Component {

  render() {
    let spin = this.props.refreshing === true ? "fa-spin" : "";
    
    return <a className="link" href="" onClick={(event) => {
      this.props.refresh(event)
    }}><i className={ "fa fa-refresh " + spin } aria-hidden="true"/></a>;
  }

}

export default Refresh;