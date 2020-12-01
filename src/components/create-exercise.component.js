import React, { Component } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker'; //import react datepicker method
import "react-datepicker/dist/react-datepicker.css"; //imports datepicker styling

export default class CreateExercises extends Component {
  constructor(props) {
    super(props);

    // binding this to its appropriate data
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  // React Lifecycle method, calls before anything displays on the page
  componentDidMount() {
    axios.get('http://localhost:8080/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
  }

  // setting the state of Username
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  // setting the state of the Description
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // setting the state of the Duration
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  // setting the state of the Date
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault(); // prevents the default form submit behavior from taking place

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios.post('http://localhost:8080/exercises/add', exercise) // sends http post request using axios
            .then(res => console.log(res.data)); //promise which outputs the result

    window.location = "/"; //takes user back to homepage
  }

  render() {
    return (
      <div>
        <h2>Create New Exercise Log</h2>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
          <label> Username:</label>
          <select
            ref="userInput"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
          >
            {
            this.state.users.map(function(user) {
              return <option
                key={user}
                value={user}>
                {user}
              </option>;
             })
            }
          </select>
        </div>
        
        <div className="form-group">
            <label>Desctiption</label>
            <input
                type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
            />
        </div>
        <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
                type="text"
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
            />
        </div>
        <div className="form-group">
            <label>Date:</label>
            <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
            />
        </div>

        <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
      </div>
    );
  }
}
