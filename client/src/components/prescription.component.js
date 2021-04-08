//This is the prescription component
import axios from 'axios';
import { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

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

    deletePrescription(id) {
        axios.delete('/api/prescription/delete', {
            params: {
                id: id
            }
        }).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data);
            window.alert(error.response.data);
        });

        this.setState({
            prescriptions: this.state.prescriptions.filter(el => el._id !== id)
        })
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
                                                        refill,
                                                        _id,
                                                         }) => (
                                                             <Card>
                                                                 <Card.Header>
                                                                    <Accordion.Toggle eventKey={healthcardno, medicine, ailment}>
                                                                        Medicine: {medicine}
                                                                    </Accordion.Toggle>
                                                                    <div>
                                                                        <Link to={"/addPrescription/edit/"+_id}  variant="primary" 
                                                                            disabled={!this.state.doctor}>
                                                                                Edit
                                                                        </Link>
                                                                        <Button variant="danger" 
                                                                            disabled={!this.state.doctor}
                                                                            onClick={() => { this.deletePrescription(_id) }}>
                                                                                Delete
                                                                        </Button> 
                                                                    </div>
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