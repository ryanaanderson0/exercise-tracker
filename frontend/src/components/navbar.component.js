import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg justify-content-center">
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                <button className="primary-button">New Game Log</button>
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/athlete" className="nav-link">
              <button className="primary-button"> New Gamer</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}



