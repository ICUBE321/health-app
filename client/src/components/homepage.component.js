//A homepage

import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Homepage extends Component {
    
    render() {
        return (
            <div>
                <li className="navbar-item">
                    <Link to="/profile" className="nav-link">Profile Page</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/appointments" className="nav-link">Your Appointments</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/prescriptions" className="nav-link">Your Prescriptions</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/findlab" className="nav-link">Find Labs near you</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/findclinic" className="nav-link">Find clinics near you</Link>
                </li>
            </div>
        )
    }
}