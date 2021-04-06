import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            username: Number,
            password: '',
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({ user: user });
        console.log("Local storage state in login page: ");
        console.log(this.state.user);
        this.goToDetails();
    }

    goToDetails() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            console.log("In go to details function: ");
            console.log(loggedInUser);
            window.location = "/details";
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: parseInt(e.target.value)
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    handlSubmit = (e) => {
        e.preventDefault();
        const user = { 
            username: this.state.username, 
            password: this.state.password,
        };
        console.log("User data trying to log in: ");
        console.log(user);
        //send the username and password to server
        axios.post("/api/auth/login", user)
            .then(res => {
                console.log(res.data);
                var items = [];
                items.push(res.data.userId);
                items.push(res.data.token);
                items.push(res.data.firstname);
                localStorage.setItem('user', JSON.stringify(items));
                this.setState({
                    user : res.data,
                });
                //console.log(r);
                this.goToDetails();
            }
        ).catch(error => console.log("Error while logging in: " + error));
    };

    //if there's a user show the message below
        
    //if no user, show login form
    render() {
        return(
            <div>
            <div id="intro" className="mx-auto">
                <h3><span className="badge badge-secondary">USER LOGIN</span></h3>
            </div>
            
            <div>
                <form onSubmit={this.handlSubmit} id="uloginform" method="post">
                    <div className="form-group">
                        <label for="hcn">Healthcard Number</label>
                        <input type="number" maxLength="10" 
                            minLength="10" 
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
                            className="form-control" id="uhcn"
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>
                    </div>
    
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" 
                            className="form-control" id="upass" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}/>
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-lg" id="btn-signin">Login</button>
                </form>
            </div>
            
        </div>
    
        );
    }
};       

    