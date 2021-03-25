//Appointments Component

import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';

export default class Appointments extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Appointment 1 Date
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p>Doctor's Name</p>
                                <p>Ailment</p>
                                <p>Medicine</p>
                                <p>Dispensed Volume</p>
                                <p>Prescribed Quantity</p>
                                <p>Refill</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Appointment 2 Date
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <p>Doctor's Name</p>
                                <p>Ailment</p>
                                <p>Medicine</p>
                                <p>Dispensed Volume</p>
                                <p>Prescribed Quantity</p>
                                <p>Refill</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> 
            </div>
        )
    }
}