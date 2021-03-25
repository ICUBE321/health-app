//page for adding new prescriptions
//should only be accessible by doctors

import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
            date: Date,
            medicine: "",
            ailment: "",
            amount: "",
            frequency: "",
            refills: "",
            healthcardno: "",
        } 

        this.onAddPrescription = this.onAddPrescription.bind(this);
        this.onChangeAilment = this.onChangeAilment.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeHealthCardNo = this.onChangeHealthCardNo.bind(this);
        this.onChangeMedicine = this.onChangeMedicine.bind(this);
        this.onChangeRefills = this.onChangeRefills .bind(this);
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value 
        });
    }

    onChangeMedicine(e) {
        this.setState({
            medicine: e.target.value
        });
    }

    onChangeAilment(e) {
        this.setState({
            ailment: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeFrequency(e) {
        this.setState({
            frequency: e.target.value
        });
    }

    onChangeRefills(e) {
        this.setState({
            refills: e.target.value
        });
    }

    onChangeHealthCardNo(e) {
        this.setState({
            healthcardno: e.target.value
        });
    }

    onAddPrescription(e) {
        e.preventDefault();

        const newPrescription = {
            date: this.state.date,
            medicine: this.state.medicine,
            ailment: this.state.ailment,
            amount: this.state.amount,
            frequency: this.state.frequency,
            refills: this.state.refills,
            healthcardno: this.state.healthcardno
        };

        console.log(newPrescription);
    }

    render() {
        return (
            <Form noValidate validated={validated} onSubmit={this.onAddPrescription}>
                <Form.Group controlId="form.ControlInput0">
                    <Form.Label>Patient Health Card Number</Form.Label>
                    <Form.Control name="healthcardno"
                        value={this.state.healthcardno}
                        onChange={this.onChangeHealthCardNo}
                        type="text"
                        required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="form.ControlInput1">
                    <Form.Label>Date Assigned</Form.Label>
                    <Form.Control
                        name="date"
                        onChange={this.onChangeDate}
                        type="date"
                        required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="form.ControlInput2">
                    <Form.Label>Medicine Name</Form.Label>
                    <Form.Control value={this.state.medicine}
                        name="medicine"
                        onChange={this.onChangeMedicine}
                        type="text" 
                        placeholder="zofran"
                        required/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="form.ControlInput3">
                    <Form.Label>Patient Ailment</Form.Label>
                    <Form.Control value={this.state.ailment}
                        name="ailment"
                        onChange={this.onChangeAilment}
                        type="text" 
                        placeholder="nausea"
                        required/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="form.ControlInput4">
                    <Form.Label>Dispensed Amount</Form.Label>
                    <Form.Control value={this.state.amount}
                        name="amount"
                        onChange={this.onChangeAmount}
                        type="text" placeholder="30-thirty"/>
                </Form.Group>
                <Form.Group controlId="form.ControlInput5">
                    <Form.Label>Prescribed Frequency</Form.Label>
                    <Form.Control value={this.state.frequency}
                        name="frequency"
                        onChange={this.onChangeFrequency}
                        type="text" placeholder="daily"/>
                </Form.Group>
                <Form.Group controlId="form.ControlInput6">
                    <Form.Label>Refills</Form.Label>
                    <Form.Control value={this.state.refills}
                        name="refills"
                        onChange={this.onChangeRefills}
                        type="text" placeholder="11 refills"/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }
}