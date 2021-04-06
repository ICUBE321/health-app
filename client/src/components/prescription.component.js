//This is the prescription component
import axios from 'axios';
import { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export default class Prescriptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prescriptions: [],
            user: localStorage.getItem('user'),
            doctor: localStorage.getItem('doctor'),
        };

    }

    componentDidMount() {
        const userDetails = this.state.user;
        const parsedUserDetails = JSON.parse(userDetails);
        const doctorDetails = this.state.doctor;
        const parsedDoctorDetails = JSON.parse(doctorDetails);
        if(parsedUserDetails && parsedUserDetails.length > 0) {
            const userId = parsedUserDetails[0];
            axios.get("/api/user", {
                params: {
                    id: userId
                }
            }).then(res => {
                let cardno = res.data[0].healthcardno;
                axios.get('/api/prescription/user', {
                    params: {
                        healthcardno: cardno
                    }
                }).then(response => {
                    this.setState({ prescriptions: response.data });
                })
                .catch((error) => {
                    console.log(error.response.data);
                    window.alert(error.response.data);
                })
            })
            .catch((error) => {
                console.log(error.response.data);
                window.alert(error.response.data);
            })
            
        } else if(parsedDoctorDetails && parsedDoctorDetails.length > 0) {
            axios.get('/api/prescription/')
            .then(response => {
                this.setState({ prescriptions: response.data });
            })
            .catch((error) => {
                console.log(error.response.data);
                window.alert(error.response.data);
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="primary" onClick={() => {
                        window.location.href = "/addPrescription"
                    }}
                    disabled={!this.state.doctor}>Add Prescription</Button>
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