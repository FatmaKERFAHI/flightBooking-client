import React, { Component } from 'react';

class ConfirmationFlight extends Component {

  render() {
  return (
    
    <div>
      {this.props.match.params.id}
  </div>
  )
  
 }
}

export default ConfirmationFlight;