import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import shared from "../shared.module.css";
import styles from "./patientDetail.module.css";

export default class PatientDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem("user"),
      doctor: localStorage.getItem("doctor"),
      healthcardno: "",
      details: [],
    };
  }

  componentDidMount() {
    const userDetails = this.state.user;
    const parsedUserDetails = JSON.parse(userDetails);
    const doctorDetails = this.state.doctor;
    const parsedDoctorDetails = JSON.parse(doctorDetails);
    if (parsedDoctorDetails && parsedDoctorDetails.length > 0) {
      this.userDetails();
    } else {
      window.location = "/";
    }
  }

  userDetails = () => {
    const userCardNumber = this.props.match.params.id;

    axios
      .get("/api/detail", {
        params: {
          healthcardno: userCardNumber,
        },
      })
      .then((response) => {
        const data = response.data;
        this.setState({
          healthcardno: userCardNumber,
          details: data,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        window.alert(error.response.data);
      });
  };

  displayProfile = (details) => {
    if (!details.length) return null;
    return details.map((detail, index) => (
      <div className={styles.details} key={index}>
        <p>
          Health Card Number: <h3>{this.state.healthcardno}</h3>
        </p>
        <p>
          Date of Birth: <h3>{detail.DOB}</h3>
        </p>
        <p>
          Height: <h3>{detail.height}</h3>
        </p>
        <p>
          Weight: <h3>{detail.weight}</h3>
        </p>
        <p>
          Blood Type: <h3>{detail.bloodtype}</h3>
        </p>
        <p>
          Allergies: <h3>{detail.allergies}</h3>
        </p>
        <p>
          Organ Donor: <h3>{detail.donor}</h3>
        </p>
        <p>
          Other Health Problems: <h3>{detail.healthprobs}</h3>
        </p>
      </div>
    ));
  };

  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.profile}`}>
        <h1 className={styles.heading}>Profile Page</h1>
        <>{this.displayProfile(this.state.details)}</>
        <Link to="/patients">
          <button type="submit" className={styles.button} id="btn_signup">
            Back
          </button>
        </Link>
      </div>
    );
  }
}
