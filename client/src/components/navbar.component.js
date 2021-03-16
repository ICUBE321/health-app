import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Health App</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/appointments" className="nav-link">Your Appointments</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/prescriptions" className="nav-link">Your Prescriptions</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}