import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      athletes: []
    }
  }

  componentDidMount() {
    axios.get('https://lit-bastion-77590.herokuapp.com/athletes/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            athletes: response.data.map(athlete => athlete.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('https://lit-bastion-77590.herokuapp.com/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3 className="text-center">Create New Game Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label className="form-label">Gamer: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.athletes.map(function(athlete) {
                  return <option 
                    key={athlete}
                    value={athlete}>{athlete}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label className="form-label">Game Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label className="form-label">Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label className="form-label">Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
              className="datepicker-styles"
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add Game Log" className="primary-button button-spacing " />
        </div>
      </form>
    </div>
    )
  }
}