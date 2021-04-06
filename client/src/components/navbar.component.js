import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem('user'),
            doctor: localStorage.getItem('doctor'),
        };
    }

    handleLogout() {
        localStorage.clear();
        window.location = "/";
    }

    render() {
        if(this.state.user && this.state.user.length > 0) {
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
        } else if (this.state.doctor && this.state.doctor.length > 0){
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Health App</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/appointments" className="nav-link">Patient Appointments</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/prescriptions" className="nav-link">Patient Prescriptions</Link>
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