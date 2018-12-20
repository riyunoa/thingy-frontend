import React, { Component } from 'react';
import axios from "axios";

class CurrentBooking extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };
  }

  onCodeChange = (e) => {
    let code = e.target.value;
    console.log(code);

    this.setState({
      code: code
    });
  }

  validateCode = async (e) => {
    console.log('validate code');
    console.log(this.state);

    let res = await axios.post('https://fxjhxhz2zj.execute-api.ap-southeast-2.amazonaws.com/default/', {
      code: this.state.code
    });

    console.log(res.data);

    this.setState({
      success: true
    });
  }

  render() {
    return (
      <div className="current-booking">
        <h2>Current Booking</h2>

        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="time"
              value={this.state.code}
              onChange={this.onCodeChange}
              placeholder='Enter Code'
            />
          </div>
        </form>

        <button
          className="btn btn-primary"
          onClick={this.validateCode}
        >
          Start!
        </button>
        &nbsp;
        <a
          className="btn btn-secondary"
          href="/create"
        >
          Make New Booking
        </a>
      </div>
    );
  }
}

export default CurrentBooking;
