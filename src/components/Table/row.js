import React from 'react';
import { Link } from "react-router-dom";
import moment from 'moment'


export const Row = (flight) => (
  <tr key={flight.idFlight}>
    <td>
      <span>{flight.departure.name}</span>
    </td>
    <td>
      <span>{flight.arrival.name}</span>
    </td>
    <td>
      <span>{moment.utc(flight.departureDate).format('YYYY-MM-DD hh:mm')}</span>
    </td>
    <td>
      <span>{moment.utc(flight.arrivalDate).format('YYYY-MM-DD hh:mm')}</span>
    </td>
    <td>
      <span>{flight.price} EUR</span>
    </td>
    <td>
    <Link to={`/payment/${ flight.idFlight }`}>
      < button id={flight.idFlight}>Réserver</button>
    </Link>
    </td>
  </tr>
);