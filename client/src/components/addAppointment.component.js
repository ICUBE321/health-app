//page for adding new prescriptions
//should only be accessible by doctors

import { Component } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const addAppointmentSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    healthcardno: Yup.string().required("Health Card number is required").matches(/^[1-9]{10}[A-Z]{2}$/).length(12, 'Must be 12 characters long'),
    
});

export default class addAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            healthcardno : "",
            date : new Date(),
            time : "",
            edit: false,
            appointmentId: ""
        }

    }

    componentDidMount() {
        this.getAppointmentDetails();
    }

    getAppointmentDetails = () => {
        const appointmentId = this.props.match.params.id;
        if(appointmentId) {
            axios.get("/api/appointment/single", {
                params: {
                    id: appointmentId
                }
            }).then((response) => {
                const data = response.data[0];
                this.setState({
                    edit: true,
                    healthcardno: data.healthcardno,
                    date: data.date,
                    time: data.time,
                    appointmentId: appointmentId,
                })
            }).catch(error => {
                console.log(error.response.data);
            })
        }
    }

    render() {
        return (
            <Formik 
            enableReinitialize
            initialValues={{
                healthcardno: this.state.healthcardno,
                date: this.state.date,
                time: this.state.time
            }}
             validationSchema={addAppointmentSchema} 
             onSubmit={(values) => {

                this.setState({
                    healthcardno : values.healthcardno,
                    date : values.date,
                    time : values.time,
                })

                //make up new prescription using values
                const newAppointment = {
                    healthcardno : this.state.healthcardno,
                    date : this.state.date,
                    time : this.state.time,
                };

                if(this.state.edit) {
                    axios.post('/api/appointment/edit', newAppointment, {
                        params: {
                            id: this.state.appointmentId
                        }
                    }).then((response) => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                        window.alert(error.response.data);
                    })
                } else {
                    axios.post('/api/appointment/add', newAppointment)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                        window.alert(error.response.data);
                    })
                }
                window.location = "/appointments"
                
                }}>
                    {(formik) => {
                        const { errors, touched, isValid, dirty } = formik;
                        return (
                            <Form>
                                <div>
                                <label>Patient Health Card Number</label>
                                <Field name="healthcardno"
                                    id="healthcardno"
                                    className={errors.healthcardno && touched.healthcardno ?
                                    "input-error" : null}
                                    type="text"
                                    placeholder="1234567893CA"
                                    disabled={this.state.edit}
                                     />
                                     <ErrorMessage name="healthcardno" component="span" className="error"/>
                                </div>
                                <div>
                                <label>Date Assigned</label>
                                <Field name="date"
                                    id="date"
                                    className={errors.date && touched.date ?
                                    "input-error" : null}
                                    type="date"
                                     />
                                     <ErrorMessage name="date" component="span" className="error"/>
                                </div>
                                <div>
                                <label>Time of Appointment</label>
                                <Field name="time"
                                    id="time"
                                    className={errors.time && touched.time ?
                                    "input-error" : null}
                                    type="time"
                                     />
                                     <ErrorMessage name="time" component="span" className="error"/>
                                </div>
                                <Button variant="primary" 
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid)}>
                                        Submit
                                </Button>
                                <Button variant="danger" 
                                    type="button"
                                    onClick={() => { window.location = "/appointments"; }}
                                    >
                                        Cancel
                                </Button>
                            </Form>
                        )
                    }}
            </Formik>
        )
    };
}