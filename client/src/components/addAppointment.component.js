//page for adding new prescriptions
//should only be accessible by doctors

import { Component } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
    date: Date,
    healthcardno: "",
    time: "",
};

const addAppointmentSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    healthcardno: Yup.string().required("Health Card number is required"),
    
});

export default class addAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            healthcardno : "",
            date : new Date(),
            time : "",
        }
    }

    render() {
        return (
            <Formik initialValues={initialValues}
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

                axios.post('/api/appointment/add', newAppointment)
                    .then(response => console.log(response.data))
                    .catch(error => {
                        if (error.response){
                                console.log("Error response: " + error.response.data);  
                            }else if(error.request){
                                console.log("Error request: " + error.request);  
                            }else if(error.message){
                                console.log("Error message: " + error.message);  
                            }
                    })
                
                // window.location = '/api/appointment';

                 console.log(values);
                 console.log(newAppointment);
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
                                    placeholder="12345"
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
                            </Form>
                        )
                    }}
            </Formik>
        )
    };
}