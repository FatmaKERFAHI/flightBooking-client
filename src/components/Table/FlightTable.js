import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Row } from './row';
import './FlightTable.css';

class FlightTable extends Component {

  render() {
  return (
    <div>
      <table className="table">
      <thead>
        <tr>
          <th>Aéroport départ</th>
          <th>Aéroport destination</th>
          <th>Date départ</th>
          <th>Date arrivé</th>
          <th>Prix</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{this.props.flights.map(Row)}</tbody>
      </table>
  </div>
  )
  
 }
}

export default withRouter(FlightTable);
