//This is the prescription component
import axios from 'axios';
import { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export default class Prescriptions extends Component {
    constructor(props) {
        super(props);

        this.state = {prescriptions: []};

    }

    componentDidMount() {
        axios.get('/api/prescription/')
            .then(response => {
                this.setState({ prescriptions: response.data });
            })
            .catch((error) => {
                console.log("Problem retrieving prescriptions!");
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="primary" onClick={() => {
                        window.location.href = "/addPrescription"
                    }}>Add Prescription</Button>
                </div>
                <Accordion>
                    {this.state.prescriptions.map(({ healthcardno,
                                                        date,
                                                        ailment,
                                                        medicine,
                                                        volume,
                                                        prescribed_quantity,
                                                        refill
                                                         }) => (
                                                             <Card>
                                                                 <Card.Header>
                                                                    <Accordion.Toggle eventKey={healthcardno, medicine, ailment}>
                                                                        Medicine: {medicine}
                                                                    </Accordion.Toggle>
                                                                 </Card.Header>
                                                                 <Accordion.Collapse eventKey={healthcardno, medicine, ailment}>
                                                                    <Card.Body>
                                                                        <p>Patient Health Card Number: {healthcardno}</p>
                                                                        <p>Date: {date}</p>
                                                                        <p>Ailment: {ailment}</p>
                                                                        <p>Frequency: {volume}</p>
                                                                        <p>Amount: {prescribed_quantity}</p>
                                                                        <p>Refills: {refill}</p>
                                                                    </Card.Body>
                                                                 </Accordion.Collapse>
                                                             </Card>
                                                             
                                                         ))}
                </Accordion> 
            </div>
        )
    }
}