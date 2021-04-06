//page for adding new prescriptions
//should only be accessible by doctors

import { Component } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
    date: Date,
    medicine: "",
    ailment: "",
    amount: "",
    frequency: "",
    refills: "",
    healthcardno: "", 
};

const addPrescriptionSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    medicine: Yup.string().required("Medicine is required"),
    ailment: Yup.string().required("Ailment is required"),
    amount: Yup.string().required("Amount is required"),
    frequency: Yup.string().required("Frequency is required"),
    refills: Yup.string().required("Refills is required"),
    healthcardno: Yup.string().required("Health Card number is required"),
    
});

export default class addPrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            healthcardno : "",
            date : new Date(),
            ailment : "",
            medicine : "",
            volume : "",
            quantity : "", 
            refill : "",
        }
    }

    render() {
        return (
            <Formik initialValues={initialValues}
             validationSchema={addPrescriptionSchema} 
             onSubmit={(values) => {

                this.setState({
                    healthcardno : values.healthcardno,
                    date : values.date,
                    ailment : values.ailment,
                    medicine : values.medicine,
                    volume : values.frequency,
                    quantity : values.amount, 
                    refill : values.refills,
                })

                //make up new prescription using values
                const newPrescription = {
                    healthcardno : this.state.healthcardno,
                    date : this.state.date,
                    ailment : this.state.ailment,
                    medicine : this.state.medicine,
                    volume : this.state.volume,
                    prescribed_quantity : this.state.quantity, 
                    refill : this.state.refill,
                };

                axios.post('/api/prescription/add', newPrescription)
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
                
                window.location = '/api/prescription';

                 console.log(values);
                 console.log(newPrescription);
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
                                <label>Medicine Name</label>
                                <Field name="medicine"
                                    id="medicine"
                                    className={errors.medicine && touched.medicine ?
                                    "input-error" : null}
                                    type="text"
                                    placeholder="zoran"
                                     />
                                     <ErrorMessage name="medicine" component="span" className="error"/>
                                </div>
                                <div>
                                <label>Patient Ailment</label>
                                <Field name="ailment"
                                    id="ailment"
                                    className={errors.ailment && touched.ailment ?
                                    "input-error" : null}
                                    type="text"
                                    placeholder="nausea"
                                     />
                                     <ErrorMessage name="ailment" component="span" className="error"/>
                                </div>
                                <div>
                                <label>Dispensed Amount</label>
                                <Field name="amount"
                                    id="amount"
                                    className={errors.amount && touched.amount ?
                                    "input-error" : null}
                                    type="text"
                                    placeholder="30-thirty"
                                     />
                                     <ErrorMessage name="amount" component="span" className="error"/>
                                </div>
                                <div>
                                <label>Prescribed Frequency</label>
                                <Field name="frequency"
                                    id="frequency"
                                    className={errors.frequency && touched.frequency ?
                                    "input-error" : null}
                                    type="text"
                                    placeholder="daily"
                                     />
                                     <ErrorMessage name="frequency" component="span" className="error"/>
                                </div>
                                <div>
                                <label>Refills</label>
                                <Field name="refills"
                                    id="refills"
                                    className={errors.refills && touched.refills ?
                                    "input-error" : null}
                                    type="text" 
                                    placeholder="11 refills"
                                     />
                                     <ErrorMessage name="refills" component="span" className="error"/>
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