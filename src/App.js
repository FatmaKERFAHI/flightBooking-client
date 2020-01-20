import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Checkout from "./checkout";
import SearchForm from "./components/searchForm/SearchForm";
import ConfirmationFlight from "./pages/ConfirmationFlight";
import Home from "./pages/home/Home";
import "./App.css";

class App extends Component {

  render(){
  return (
    <Router>
       <Switch>
           <Route exact path="/" component = {Home}/>
           <Route path="/search" component = {SearchForm}/>
           <Route path="/ConfirmationFlight/:idFlight" component={ConfirmationFlight} />
           <Route path="/payment/:idFlight" component={Checkout} />
        </Switch>
    </Router>

  );
}
}

export default App;
