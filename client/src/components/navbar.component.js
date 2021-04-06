import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
        };
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({ user: user });
        //console.log("Local storage state in navbar: ");
        //console.log(this.state.user);
    } 

    handleLogout() {
        localStorage.clear();
        window.location = "/";
    }

    render() {
        if(this.state.user != null && this.state.user.username != '') {
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Health App</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/appointments" className="nav-link">Your Appointments</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/prescriptions" className="nav-link">Your Prescriptions</Link>
                        </li>
                        <li className="navbar-item">
                            <Link onClick={this.handleLogout} className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            )
        }
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Health App</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">User Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-link">Create an Account</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/dlogin" className="nav-link">Doctor's Login</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        )
    }
}