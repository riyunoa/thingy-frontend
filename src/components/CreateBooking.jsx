import React, { Component } from 'react';
import axios from 'axios';

class CreateBooking extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toISOString(),
      success: false,
      code: 'asdf'
    };
  }

  onTimeChange = (e) => {
    let time = e.target.value;
    console.log(time);

    this.setState({
      time: time
    });
  }

  onBookClicked = (e) => {
    console.log(this.state);
    axios.put('https://2imhj0j1vk.execute-api.ap-southeast-2.amazonaws.com/default/CreateToken', {
      startDate: this.state.time,
      endDate: this.state.time
    });

    this.setState({
      success: true
    });
  }

  render() {
    return (
      <div className="create-booking">
        <h2>Book a Microwave!</h2>

        {this.state.success &&
        <div className="alert alert-success" role="alert">
          Booking successful!
          Your code is <strong>{this.state.code}</strong>
        </div>}

        <form>
          <div className="form-group row">
            <label htmlFor="bookingTime" className="col-sm-2 col-form-label">Time</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="time"
                value={this.state.time}
                onChange={this.onTimeChange}
              />
            </div>
          </div>
        </form>

        <button
          className="btn btn-primary"
          onClick={this.onBookClicked}
        >
          Book
        </button>
      </div>
    );
  }
}

export default CreateBooking;
