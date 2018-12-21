import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import './App.css';

import CreateBooking from "./components/CreateBooking";
import CurrentBooking from "./components/CurrentBooking";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="header">
            <h1>QWAVE</h1>
          </div>
          <Router>
            <div>
              <Route exact path="/" component={CurrentBooking} />
              <Route exact path="/create" component={CreateBooking} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
