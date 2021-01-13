import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import square_button from "../assets/square-button.png";
import x_button from "../assets/x-button.png";


const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}><img src={square_button} /></Link> <a href="/" onClick={() => { props.deleteExercise(props.exercise._id) }}><img src={x_button} /></a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('https://lit-bastion-77590.herokuapp.com/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('https://lit-bastion-77590.herokuapp.com/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 class="text-center">Logged Sessions</h3>
        <table className="table">
          <thead width="100%" className="tablehead" >
            <tr>
              <th style={{borderStyle:"none"}}>Gamer</th>
              <th style={{borderStyle:"none"}}>Game Title</th>
              <th style={{borderStyle:"none"}}>Duration</th>
              <th style={{borderStyle:"none"}}>Date</th>
              <th style={{borderStyle:"none"}}>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}