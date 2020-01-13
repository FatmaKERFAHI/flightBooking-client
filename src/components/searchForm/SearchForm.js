import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import styles from './SearchForm.module.css';
import NumericInput from 'react-numeric-input';
import moment from 'moment'
import FlightTable from "./../Table/FlightTable";
import AutoComptete from "./../autoComptete/AutoComptete";


class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state ={
      flights:[],
      isEmptyList: false,
      clicks:0,
      showMe:true
    };
  }

    IncrementItem = () => {
      this.setState({ clicks: this.state.clicks + 1 });
    }
    DecreaseItem = () => {
      this.setState({ clicks: this.state.clicks - 1 });
    }
   
    callbackDeparture = (value) => {
      this.setState({ aeroportDepart: value });
    }

    callbackArrival = (value) => {
      this.setState({ aeroportDestination: value });
    }
  
    onChangeHandler = (event) => {
      console.log(event);
      this.setState({
        [event.target.id]: event.target.value
      })
    }

    searchFlight = () => {      
      axios.get('http://localhost:8081/flight/search', {
        params: {
          flightFrom: this.state.aeroportDepart,
          flightTo: this.state.aeroportDestination,
          departureDate: moment(this.state.startDate).format('YYYY-MM-DD'),
          arrivalDate: moment(this.state.endDate).format('YYYY-MM-DD'),
          classVol: 'ECONOMIC',
          typeVol: 'ALLERRETOUR'
          }
      }).then(response => {
        this.setState({
          flights:response.data,
          isEmptyList:response.data && response.data.length === 0
        })
        return response.data;
      })
    }

    renderEmptyTable() {
      return (
        <div className="sr-field-success message">
          <h1>Oops !!!</h1>
          <p>Désolé, il n'y a pas de vol dans cette période</p>
        </div>
      );
    }


    handleClick = () => {
      this.props.history.push("/ConfirmationFlight");
  }
    

  render() {
  return (
    <div>

    <h1 className="checkout-title">Chercher Vol</h1>

    <div className={styles.searchBody}>
      
      <div className="col-search">
        <div className={styles.aeroportDepart}>
          <AutoComptete idInput="aeroportDepart" labelInput="Aéroport Départ" parentCallback={this.callbackDeparture}/>        
        </div>
        <div className={styles.aeroportDestination}>
          <AutoComptete idInput="aeroportDestination" labelInput="Aéroport Destination" parentCallback={this.callbackArrival}/>
        </div>
      </div>
      {/* <div className={styles.text}>
        <p style= {{wordSpacing: "120px"}}>Départ  Retour</p>
      </div> */}
    
      <div className="col-search">
        <div className={styles.date}>
        <DateRangePicker 
              displayFormat='DD/MM/YYYY'
              startDate={this.state.startDate} 
              startDateId="Depart" 
              endDate={this.state.endDate} 
              endDateId="Retour" 
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
              focusedInput={this.state.focusedInput} 
              onFocusChange={focusedInput => this.setState({ focusedInput })} 
          />
        </div>   
        <div className={styles.ageVoyageur}>
            <NumericInput id="ageVoyageur" className="form-control" min={0} max={20} placeholder="Nombre voyageurs"/>  
        </div> 
      </div>  

      <div>
          <button className={styles.btnSearch} onClick={this.searchFlight}>Chercher</button>
      </div>
    </div>

    {this.state.flights.length > 0 && <FlightTable flights={this.state.flights}/>}
    {this.state.isEmptyList && this.renderEmptyTable()}

    </div>  

      
  )
  
 }
}

export default withRouter(SearchForm);