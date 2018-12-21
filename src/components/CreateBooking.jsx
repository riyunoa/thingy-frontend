import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css'
class CreateBooking extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toISOString(),
      name: '',
      success: false,
      code: ''
    };
  }

  onTimeChange = (e) => {
    console.log(e);
    let time = moment(e).utc();

    this.setState({
      time: time
    });
  }

  onNameChange = (e) => {
    let name = e.target.value;
    console.log(name);

    this.setState({
      name: name
    });
  }

  onBookClicked = async (e) => {
    let endDate = moment(this.state.time).add(5, 'm').utc();
    console.log(this.state);
    let res = await axios.put('https://2imhj0j1vk.execute-api.ap-southeast-2.amazonaws.com/default/CreateToken', {
      startDate: this.state.time,
      endDate: endDate,
      username: this.state.name
    });

    let code = res.data.code;

    console.log(res);
    this.setState({
      success: true,
      code: code
    });
  }

  render() {
    return (
      <div className="create-booking">
        <h2>Book a Microwave</h2>

        {this.state.success &&
        <div className="alert alert-success" role="alert">
          Booking successful!
          Your code is <strong>{this.state.code}</strong>
        </div>}

        <form>
          <div className="form-group row">
            <label htmlFor="bookingTime" className="col-sm-2 col-form-label">Time</label>
            <div className="col-sm-10">
              <TimePicker
                showSecond={false}
                minuteStep={5}
                onChange={this.onTimeChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                value={this.state.name}
                onChange={this.onNameChange}
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
        &nbsp;
        <a
          className="btn btn-outline-primary"
          href="/"
        >
          I have a booking
        </a>
      </div>
    );
  }
}

export default CreateBooking;
