import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CreateBooking from "./components/CreateBooking";
import CurrentBooking from "./components/CurrentBooking";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
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
