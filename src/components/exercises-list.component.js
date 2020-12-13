import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id) }}>Delete</a>
        </td>
    </tr>
)


export default class ExercisesList extends Component {
    constructor(props) {
        super (props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};// initilizes the state
    }

    componentDidMount() {
        axios.get('http://localhost:8080/exercises/')
            .then(response => {
                this.setState({ exercises: response.data}) //returns all fields for exercises
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:8080/exercises/'+id)
            .then(res => console.log(res.data))

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)// _id is the id associated with the mongoDB id
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />; //returns Exercise component with three props: currentexercise, deleteExercies, and currentexercise id
        })
    }

    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}