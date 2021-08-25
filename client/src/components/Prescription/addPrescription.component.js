//page for adding new prescriptions
//should only be accessible by doctors

import { Component } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import shared from "../shared.module.css";
import styles from "./addPrescription.module.css";

const addPrescriptionSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  medicine: Yup.string().required("Medicine is required"),
  ailment: Yup.string().required("Ailment is required"),
  volume: Yup.string().required("Amount is required"),
  prescribed_quantity: Yup.string().required("Frequency is required"),
  refill: Yup.string().required("Refills is required"),
  healthcardno: Yup.string()
    .required("Health Card number is required")
    .matches(/^[1-9]{10}[A-Z]{2}$/)
    .length(12, "Must be 12 characters long"),
});

export default class addPrescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      healthcardno: "",
      date: new Date(),
      ailment: "",
      medicine: "",
      volume: "",
      prescribed_quantity: "",
      refill: "",
      edit: false,
      prescriptionId: "",
      user: localStorage.getItem("user"),
      doctor: localStorage.getItem("doctor"),
    };
  }

  componentDidMount() {
    const userDetails = this.state.user;
    const parsedUserDetails = JSON.parse(userDetails);
    const doctorDetails = this.state.doctor;
    const parsedDoctorDetails = JSON.parse(doctorDetails);
    if (parsedDoctorDetails && parsedDoctorDetails.length > 0) {
      this.getPrescriptionDetails();
    } else {
      window.location = "/";
    }
  }

  getPrescriptionDetails = () => {
    const prescriptionId = this.props.match.params.id;
    if (prescriptionId) {
      axios
        .get("/api/prescription/single", {
          params: {
            id: prescriptionId,
          },
        })
        .then((response) => {
          const data = response.data[0];
          this.setState({
            edit: true,
            healthcardno: data.healthcardno,
            date: data.date,
            ailment: data.ailment,
            medicine: data.medicine,
            volume: data.volume,
            prescribed_quantity: data.prescribed_quantity,
            refill: data.refill,
            prescriptionId: prescriptionId,
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.addPrescpt}`}>
        <Formik
          enableReinitialize
          initialValues={{
            healthcardno: this.state.healthcardno,
            date: this.state.date,
            ailment: this.state.ailment,
            medicine: this.state.medicine,
            volume: this.state.volume,
            prescribed_quantity: this.state.prescribed_quantity,
            refill: this.state.refill,
          }}
          validationSchema={addPrescriptionSchema}
          onSubmit={(values) => {
            this.setState({
              healthcardno: values.healthcardno,
              date: values.date,
              ailment: values.ailment,
              medicine: values.medicine,
              volume: values.volume,
              prescribed_quantity: values.prescribed_quantity,
              refill: values.refill,
            });

            //make up new prescription using values
            const newPrescription = {
              healthcardno: this.state.healthcardno,
              date: this.state.date,
              ailment: this.state.ailment,
              medicine: this.state.medicine,
              volume: this.state.volume,
              prescribed_quantity: this.state.prescribed_quantity,
              refill: this.state.refill,
            };

            if (this.state.edit) {
              axios
                .post("/api/prescription/edit", newPrescription, {
                  params: {
                    id: this.state.prescriptionId,
                  },
                })
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error.response.data);
                  window.alert(error.response.data);
                });
            } else {
              axios
                .post("/api/prescription/add", newPrescription)
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error.response.data);
                  window.alert(error.response.data);
                });
            }
            window.location = "/prescriptions";
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <Form className={styles.form}>
                <div className={styles["input-group"]}>
                  <label>Patient Health Card Number:</label>
                  <Field
                    name="healthcardno"
                    id="healthcardno"
                    className={`${
                      errors.healthcardno && touched.healthcardno
                        ? "input-error"
                        : null
                    } ${styles.input}`}
                    type="text"
                    placeholder="1234567893CA"
                    disabled={this.state.edit}
                  />
                  <ErrorMessage
                    name="healthcardno"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles["input-group"]}>
                  <label>Date Assigned:</label>
                  <Field
                    name="date"
                    id="date"
                    className={`${
                      errors.date && touched.date ? "input-error" : null
                    } ${styles.input}`}
                    type="date"
                  />
                  <ErrorMessage
                    name="date"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles["input-group"]}>
                  <label>Medicine Name:</label>
                  <Field
                    name="medicine"
                    id="medicine"
                    className={`${
                      errors.medicine && touched.medicine ? "input-error" : null
                    } ${styles.input}`}
                    type="text"
                    placeholder="zoran"
                  />
                  <ErrorMessage
                    name="medicine"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles["input-group"]}>
                  <label>Patient Ailment:</label>
                  <Field
                    name="ailment"
                    id="ailment"
                    className={`${
                      errors.ailment && touched.ailment ? "input-error" : null
                    } ${styles.input}`}
                    type="text"
                    placeholder="nausea"
                  />
                  <ErrorMessage
                    name="ailment"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles["input-group"]}>
                  <label>Dispensed Amount:</label>
                  <Field
                    name="volume"
                    id="volume"
                    className={`${
                      errors.volume && touched.volume ? "input-error" : null
                    } ${styles.input}`}
                    type="text"
                    placeholder="30-thirty"
                  />
                  <ErrorMessage
                    name="volume"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles["input-group"]}>
                  <label>Prescribed Frequency:</label>
                  <Field
                    name="prescribed_quantity"
                    id="prescribed_quantity"
                    className={`${
                      errors.prescribed_quantity && touched.prescribed_quantity
                        ? "input-error"
                        : null
                    } ${styles.input}`}
                    type="text"
                    placeholder="daily"
                  />
                  <ErrorMessage
                    name="prescribed_quantity"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles["input-group"]}>
                  <label>Refills:</label>
                  <Field
                    name="refill"
                    id="refill"
                    className={`${
                      errors.refill && touched.refill ? "input-error" : null
                    } ${styles.input}`}
                    type="text"
                    placeholder="11 refills"
                  />
                  <ErrorMessage
                    name="refill"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className={`
                    ${!(dirty && isValid) ? "disabled-btn" : ""} ${
                      styles["submit-btn"]
                    }`}
                    disabled={!(dirty && isValid)}
                  >
                    Submit
                  </button>
                  <button
                    className={styles.cancel}
                    type="button"
                    onClick={() => {
                      window.location = "/prescriptions";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
