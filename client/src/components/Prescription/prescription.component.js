//This is the prescription component
import axios from "axios";
import { Component } from "react";
import { Accordion, Card } from "react-bootstrap";

import shared from "../shared.module.css";
import styles from "./prescription.module.css";

export default class Prescriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prescriptions: [],
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
            .get("/api/prescription/user", {
              params: {
                healthcardno: cardno,
              },
            })
            .then((response) => {
              this.setState({ prescriptions: response.data });
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
        .get("/api/prescription/")
        .then((response) => {
          this.setState({ prescriptions: response.data });
        })
        .catch((error) => {
          console.log(error.response.data);
          window.alert(error.response.data);
        });
    } else {
      window.location = "/";
    }
  }

  editPrescription(id) {
    window.location = "/addPrescription/edit/" + id;
  }

  deletePrescription(id) {
    axios
      .delete("/api/prescription/delete", {
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
      prescriptions: this.state.prescriptions.filter((el) => el._id !== id),
    });
  }

  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.prescription}`}>
        <button
          className={styles["blue-button"]}
          onClick={() => {
            window.location.href = "/addPrescription";
          }}
          disabled={!this.state.doctor}
        >
          Add Prescription
        </button>
        <Accordion className={styles.accordion}>
          {this.state.prescriptions.map(
            ({
              healthcardno,
              date,
              ailment,
              medicine,
              volume,
              prescribed_quantity,
              refill,
              _id,
            }) => (
              <Card>
                <Card.Header className={styles.header}>
                  <Accordion.Toggle
                    className={styles.toggle}
                    eventKey={(healthcardno, medicine, ailment)}
                  >
                    Medicine: {medicine}
                  </Accordion.Toggle>
                  <div>
                    <button
                      className={styles["blue-button"]}
                      onClick={() => {
                        this.editPrescription(_id);
                      }}
                      disabled={!this.state.doctor}
                    >
                      Edit
                    </button>
                    <button
                      className={styles["cancel-button"]}
                      disabled={!this.state.doctor}
                      onClick={() => {
                        this.deletePrescription(_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Card.Header>
                <Accordion.Collapse
                  eventKey={(healthcardno, medicine, ailment)}
                >
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
            )
          )}
        </Accordion>
      </div>
    );
  }
}
