//Patients Component

import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";

export default class Patients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patients: [],
            user: localStorage.getItem('user'),
            doctor: localStorage.getItem('doctor'),
        };
    }

    componentDidMount() {
        const userDetails = this.state.user;
        const parsedUserDetails = JSON.parse(userDetails);
        const doctorDetails = this.state.doctor;
        const parsedDoctorDetails = JSON.parse(doctorDetails);
        if(parsedDoctorDetails && parsedDoctorDetails.length > 0) {
            this.retrieveAllPatients();
        } else {
            window.location = "/";
        }
    }

    retrieveAllPatients() {
        axios.get('/api/users')
            .then((response) => {
                this.setState({ patients: response.data });                
            })
            .catch(error => {
                console.log(error.response.data);
                window.alert(error.response.data);
            })
    }

    render() {
        return (
            <div>
                <Accordion>
                    {this.state.patients.map(({ healthcardno, firstname, lastname, email }) => (
                                                             <Card>
                                                                 <Card.Header>
                                                                    <Accordion.Toggle eventKey={healthcardno}>
                                                                        Health Card Number: {healthcardno}
                                                                    </Accordion.Toggle>
                                                                    <div>
                                                                        <Link to={"/patientDetail/"+healthcardno}  variant="primary" 
                                                                            disabled={!this.state.doctor}>
                                                                                Health Details
                                                                        </Link>
                                                                    </div>
                                                                 </Card.Header>
                                                                 <Accordion.Collapse eventKey={healthcardno}>
                                                                    <Card.Body>
                                                                        <p>Firstname: {firstname}</p>
                                                                        <p>Lastname: {lastname}</p>
                                                                        <p>Email: {email}</p>
                                                                    </Card.Body>
                                                                 </Accordion.Collapse>
                                                             </Card>
                                                             
                                                         ))}
                </Accordion> 
            </div>
        )
    }
}