import React from 'react';

class Refresh extends React.Component {

  render() {
    return <a className="link" href="" onClick={(event) => {
      this.props.refresh(event)
    }}><i className="fa fa-refresh" aria-hidden="true"/></a>;
  }

}

export default Refresh;