//This is the prescription component
import axios from 'axios';
import { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const Prescription = props => (
    <Card>
        <Accordion.Toggle as={Card.Header} eventKey={props.key}>
            {props.prescription.medicine}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.key}>
            <Card.Body>
                <p>{props.prescription.date}</p>
                <p>{props.prescription.ailment}</p>
                <p>{props.prescription.volume}</p>
                <p>{props.prescription.quantity}</p>
                <p>{props.prescription.refill}</p>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
)

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

    prescriptionList() {
        return this.state.prescriptions.map(currentprescription => {
            return <Prescription prescription={currentprescription} key={currentprescription._id}/>;
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
                    { this.prescriptionList() }
                </Accordion> 
            </div>
        )
    }
}