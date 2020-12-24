
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/navbar.component';
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateAthlete from "./components/create-athlete.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ExerciseList} />
        <Route path="/exercises/:id" component={EditExercise} />
        <Route path="/exercises/add" component={CreateExercise} />
        <Route path="/athlete" component={CreateAthlete} />
      </div>
    </Router>
  );
}

export default App;
