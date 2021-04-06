//Appointments Component

import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import axios from "axios";

export default class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {appointments: []};

    }

    componentDidMount() {
        axios.get('/api/appointment/')
            .then(response => {
                this.setState({ appointments: response.data });
            })
            .catch((error) => {
                console.log("Problem retrieving appointments!");
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="primary" onClick={() => {
                        window.location.href = "/addAppointment"
                    }}>New Appointment</Button>
                </div>
                <Accordion>
                    {this.state.appointments.map(({ healthcardno,
                                                        date,
                                                        time,
                                                         }) => (
                                                             <Card>
                                                                 <Card.Header>
                                                                    <Accordion.Toggle eventKey={healthcardno, date, time}>
                                                                        Date: {date}
                                                                    </Accordion.Toggle>
                                                                 </Card.Header>
                                                                 <Accordion.Collapse eventKey={healthcardno, date, time}>
                                                                    <Card.Body>
                                                                        <p>Patient Health Card Number: {healthcardno}</p>
                                                                        <p>Time of Appointment: {time}</p>
                                                                    </Card.Body>
                                                                 </Accordion.Collapse>
                                                             </Card>
                                                             
                                                         ))}
                </Accordion> 
            </div>
        )
    }
}