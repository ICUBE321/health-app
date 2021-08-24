//page for adding new prescriptions
//should only be accessible by doctors

import { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import shared from "../shared.module.css";
import styles from "./addAppointment.module.css";

const addAppointmentSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  healthcardno: Yup.string()
    .required("Health Card number is required")
    .matches(/^[1-9]{10}[A-Z]{2}$/)
    .length(12, "Must be 12 characters long"),
});

export default class addAppointments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      healthcardno: "",
      date: new Date(),
      time: "",
      edit: false,
      appointmentId: "",
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
      this.getAppointmentDetails();
    } else {
      window.location = "/";
    }
  }

  getAppointmentDetails = () => {
    const appointmentId = this.props.match.params.id;
    if (appointmentId) {
      axios
        .get("/api/appointment/single", {
          params: {
            id: appointmentId,
          },
        })
        .then((response) => {
          const data = response.data[0];
          this.setState({
            edit: true,
            healthcardno: data.healthcardno,
            date: data.date,
            time: data.time,
            appointmentId: appointmentId,
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.addApt}`}>
        <Formik
          enableReinitialize
          initialValues={{
            healthcardno: this.state.healthcardno,
            date: this.state.date,
            time: this.state.time,
          }}
          validationSchema={addAppointmentSchema}
          onSubmit={(values) => {
            this.setState({
              healthcardno: values.healthcardno,
              date: values.date,
              time: values.time,
            });

            //make up new prescription using values
            const newAppointment = {
              healthcardno: this.state.healthcardno,
              date: this.state.date,
              time: this.state.time,
            };

            if (this.state.edit) {
              axios
                .post("/api/appointment/edit", newAppointment, {
                  params: {
                    id: this.state.appointmentId,
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
                .post("/api/appointment/add", newAppointment)
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error.response.data);
                  window.alert(error.response.data);
                });
            }
            window.location = "/appointments";
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
                  <label>Time of Appointment:</label>
                  <Field
                    name="time"
                    id="time"
                    className={`${
                      errors.time && touched.time ? "input-error" : null
                    } ${styles.input}`}
                    type="time"
                  />
                  <ErrorMessage
                    name="time"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className={`${!(dirty && isValid) ? "disabled-btn" : ""} ${
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
                      window.location = "/appointments";
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
