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