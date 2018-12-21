import React, { Component } from 'react';
import axios from "axios";
import './CurrentBooking.css';

class CurrentBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      isFree: true,
      currentBooking: null,
      inUse: false,
      gif: null,
    };

    this.currentUserTimer = null;
    this.turnOffTimer = null;
  }

  componentDidMount() {
    this.getCurrentUser();
    let timeout = 30 * 1000;
    // get the current user every so often
    this.currentUserTimer = setInterval(this.getCurrentUser, timeout);
  }

  componentWillUnmount() {
    clearInterval(this.currentUserTimer);
  }

  getCurrentUser = async () => {
    try {
      let res = await axios.get('https://i6zz14po06.execute-api.ap-southeast-2.amazonaws.com/default/CurrentValidToken');
      console.log(res.data);
      this.setState({
        currentBooking: res.data.username,
        isFree: false
      });
    } catch (e) {
      console.dir(e);
      if (e.response.status === 404) {
        this.setState({
          isFree: true
        });
      }
    }
  }

  switchOff = async () => {
    try {
      let res = await axios.post('https://fxjhxhz2zj.execute-api.ap-southeast-2.amazonaws.com/default/', {
        code: this.state.code,
        toggleOn: 0
      });

      console.log('switch off');
      clearTimeout(this.turnOffTimer);
      this.setState({
        inUse: false
      });
    } catch (e) {
      console.log('failed switching');
    }
  }

  onCodeChange = (e) => {
    let code = e.target.value;
    console.log(code);

    this.setState({
      code: code
    });
  }

  validateCode = async (e) => {
    try {
      let res = await axios.post('https://fxjhxhz2zj.execute-api.ap-southeast-2.amazonaws.com/default/', {
        code: this.state.code,
        toggleOn: 1
      });

      console.log(res.data);

      this.setState({
        success: true,
        inUse: true,
      });

      let timeout = 1 * 60 * 1000;
      this.turnOffTimer = setTimeout(this.switchOff, timeout);

      // FOR GIFS
      let gifres = axios.get('http://api.giphy.com/v1/gifs/search?q=microwave&api_key=7pxLspdvigTZ0INIO2CY3LCNyQaw2iOT&limit=1')
        .then((res) => {
          if (res.data && res.data.data && res.data.data.length > 0) {
            let pic = res.data.data[0];
            this.setState({'gif': pic.images.original.url});
          }
        });

    } catch (e) {
      this.setState({
        success: false
      });
    }
  }

  renderCurrentlyBooked = () => {
    return (
      <div>
        <h2>Currently Booked By {this.state.currentBooking}</h2>

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
          className="btn btn-outline-primary"
          href="/create"
        >
          Make New Booking
        </a>
      </div>
    );
  }

  renderFree = () => {
    return (
      <div>
        <h2>The microwave is currently free!</h2>
        <a
          className="btn btn-primary"
          href="/create"
        >
          Make a booking to use it now!
        </a>
      </div>
    );
  }


  render() {
    return (
      <div className="current-booking">
        {!this.state.isFree &&
          this.renderCurrentlyBooked()
        }
        {this.state.isFree &&
          this.renderFree()
        }
        {this.state.inUse &&
          this.renderGifs()
        }
      </div>
    );
  }

  renderGifs() {
    return (
      <div className="gifs-container">
        <div>While you wait...</div>
        { this.state.gif &&
          <img src={this.state.gif}/>
        }
      </div>
    );
  }
}

export default CurrentBooking;
