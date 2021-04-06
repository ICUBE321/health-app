import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Homepage extends Component {
    
    render() {
        return (
            <div>
                <li className="navbar-item">
                    <Link to="/patientprofile" className="nav-link">View Patients Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/docappointments" className="nav-link">Your Appointments</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/addPrescriptions" className="nav-link">Add Patients Prescriptions</Link>
                </li>
            </div>
        )
    }
}