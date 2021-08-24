//Appointments Component

import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import axios from "axios";

import shared from "../shared.module.css";
import styles from "./appointment.module.css";

export default class Appointments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      user: localStorage.getItem("user"),
      doctor: localStorage.getItem("doctor"),
    };
  }

  componentDidMount() {
    const userDetails = this.state.user;
    const parsedUserDetails = JSON.parse(userDetails);
    const doctorDetails = this.state.doctor;
    const parsedDoctorDetails = JSON.parse(doctorDetails);
    if (parsedUserDetails && parsedUserDetails.length > 0) {
      const userId = parsedUserDetails[0];
      axios
        .get("/api/user", {
          params: {
            id: userId,
          },
        })
        .then((res) => {
          let cardno = res.data[0].healthcardno;
          axios
            .get("/api/appointment/user", {
              params: {
                healthcardno: cardno,
              },
            })
            .then((response) => {
              this.setState({ appointments: response.data });
            })
            .catch((error) => {
              console.log(error.response.data);
              window.alert(error.response.data);
            });
        })
        .catch((error) => {
          console.log(error.response.data);
          window.alert(error.response.data);
        });
    } else if (parsedDoctorDetails && parsedDoctorDetails.length > 0) {
      axios
        .get("/api/appointment/")
        .then((response) => {
          this.setState({ appointments: response.data });
        })
        .catch((error) => {
          console.log(error.response.data);
          window.alert(error.response.data);
        });
    } else {
      window.location = "/";
    }
  }

  editAppointment(id) {
    window.location = "/addAppointment/edit/" + id;
  }

  deleteAppointment(id) {
    axios
      .delete("/api/appointment/delete", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        window.alert(error.response.data);
      });

    this.setState({
      appointments: this.state.appointments.filter((el) => el._id !== id),
    });
  }

  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.appointment}`}>
        <button
          className={styles["blue-button"]}
          onClick={() => {
            window.location.href = "/addAppointment";
          }}
          disabled={!this.state.doctor}
        >
          New Appointment
        </button>
        <Accordion className={styles.accordion}>
          {this.state.appointments.map(({ healthcardno, date, time, _id }) => (
            <Card>
              <Card.Header className={styles.header}>
                <Accordion.Toggle className={styles.toggle} eventKey={(healthcardno, date, time)}>
                  Date: {date}
                </Accordion.Toggle>
                <div>
                  <button
                    className={styles["blue-button"]}
                    onClick={() => {
                      this.editAppointment(_id);
                    }}
                    disabled={!this.state.doctor}
                  >
                    Edit
                  </button>
                  <button
                    className={styles["cancel-button"]}
                    disabled={!this.state.doctor}
                    onClick={() => {
                      this.deleteAppointment(_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={(healthcardno, date, time)}>
                <Card.Body>
                  <p>Patient Health Card Number: {healthcardno}</p>
                  <p>Time of Appointment: {time}</p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    );
  }
}
