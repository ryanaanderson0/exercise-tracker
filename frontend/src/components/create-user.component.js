import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
    
        // binding this to its appropriate data
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: "",
        };
      }

    // setting the state of Username
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
            
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevents the default form submit behavior from taking place
    
        const user = {
          username: this.state.username,
        }


        console.log(user);

        axios.post('http://localhost:8080/users/add', user) // sends http post request using axios
            .then(res => console.log(res.data)); //promise which outputs the result
    
       this.setState({
            username: ''
       });
      }

    render() {
        return(
            <div>
                <h2>Create A User</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Username:</label>
                    <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}