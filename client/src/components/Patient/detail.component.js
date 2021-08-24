import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import shared from "../shared.module.css"
import styles from "./detail.module.css";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem("user"),
      doctor: localStorage.getItem("doctor"),
      healthcardno: "",
      edit: false,
      DOB: Date,
      weight: Number,
      height: Number,
      bloodtype: "",
      allergies: "",
      organ_donor: "",
      healthprobs: "",
      details: [],
    };

    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeBloodtype = this.onChangeBloodtype.bind(this);
    this.onChangeAllergies = this.onChangeAllergies.bind(this);
    this.onChangeOrganDonor = this.onChangeOrganDonor.bind(this);
    this.onChangeHealthprobs = this.onChangeHealthprobs.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  componentDidMount() {
    const userDetails = this.state.user;
    const parsedUserDetails = JSON.parse(userDetails);
    const doctorDetails = this.state.doctor;
    const parsedDoctorDetails = JSON.parse(doctorDetails);
    if (parsedUserDetails && parsedUserDetails.length > 0) {
      this.userDetails();
    } else {
      window.location = "/";
    }
  }

  userDetails = () => {
    const userDetails = this.state.user;
    const parsedUserDetails = JSON.parse(userDetails);
    if (parsedUserDetails.length > 0) {
      const userId = parsedUserDetails[0];
      axios
        .get("/api/user", {
          params: {
            id: userId,
          },
        })
        .then((res) => {
          this.setState({
            healthcardno: res.data[0].healthcardno,
          });

          const cardno = res.data[0].healthcardno;

          axios
            .get("/api/detail", {
              params: {
                healthcardno: cardno,
              },
            })
            .then((response) => {
              const data = response.data[0];
              this.setState({ details: data });
              if (data.healthcardno > 0) {
                this.setState({
                  edit: true,
                  DOB: data.DOB,
                  weight: data.weight,
                  height: data.height,
                  bloodtype: data.bloodtype,
                  allergies: data.allergies,
                  organ_donor: data.donor,
                  healthprobs: data.healthprobs,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error.response.data);
          window.alert(error.response.data);
        });
    }
  };

  onChangeDOB(e) {
    this.setState({
      DOB: e.target.value,
    });
  }

  onChangeAllergies(e) {
    this.setState({
      allergies: e.target.value,
    });
  }

  onChangeBloodtype(e) {
    this.setState({
      bloodtype: e.target.value,
    });
  }

  onChangeHealthprobs(e) {
    this.setState({
      healthprobs: e.target.value,
    });
  }

  onChangeHeight(e) {
    this.setState({
      height: parseInt(e.target.value),
    });
  }
  onChangeOrganDonor(e) {
    this.setState({
      organ_donor: e.target.value,
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: parseInt(e.target.value),
    });
  }

  onHandleSubmit(e) {
    e.preventDefault();

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser.length > 0) {
      const details = {
        healthcardno: this.state.healthcardno,
        DOB: this.state.DOB,
        height: this.state.height,
        weight: this.state.weight,
        bloodtype: this.state.bloodtype,
        allergies: this.state.allergies,
        organ_donor: this.state.organ_donor,
        healthprobs: this.state.healthprobs,
      };

      if (this.state.edit) {
        axios
          .post("/api/detail/edit", details, {
            params: {
              healthcardno: details.healthcardno,
            },
          })
          .then((res) => {
            console.log(res.data);
            window.location = "/";
          });
      } else {
        axios
          .post("/api/detail/add/", details)
          .then((res) => {
            console.log(res.data);
            window.location = "/";
          })
          .catch((error) => {
            console.log(error.response.data);
            window.alert(error.response.data);
          });
      }
    }
  }

  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.detail}`}>
        <h1 className={styles.heading}>
          Fill In Your Information(all fields are required)
        </h1>
        <form
          className={styles.form}
          onSubmit={this.onHandleSubmit}
          id="regform"
          method="post"
        >
          <div className={styles["form-group"]}>
            <label for="dob">Date of Birth</label>
            <input
              type="Date"
              className={styles["form-control"]}
              id="dob"
              value={this.state.DOB}
              onChange={this.onChangeDOB}
            />
          </div>
          <div className={styles["form-group"]}>
            <label for="weight">Weight</label>
            <input
              type="number"
              className={styles["form-control"]}
              id="uweight"
              value={this.state.weight}
              onChange={this.onChangeWeight}
            />
          </div>
          <div className={styles["form-group"]}>
            <label for="height">Height</label>
            <input
              type="number"
              className={styles["form-control"]}
              id="uheight"
              value={this.state.height}
              onChange={this.onChangeHeight}
            />
          </div>
          <div className={styles["form-group"]}>
            <label for="bloodtype">Bloodtype</label>
            <div className={styles.bloodtype}>
              <p>A+</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype1"
                value="A+"
                checked={this.state.bloodtype === "A+"}
                onChange={this.onChangeBloodtype}
              />
              <p>A-</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype2"
                value="A-"
                checked={this.state.bloodtype === "A-"}
                onChange={this.onChangeBloodtype}
              />
              <p>B+</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype3"
                value="B+"
                checked={this.state.bloodtype === "B+"}
                onChange={this.onChangeBloodtype}
              />
              <p>B-</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype4"
                value="B-"
                checked={this.state.bloodtype === "B-"}
                onChange={this.onChangeBloodtype}
              />
              <p>O+</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype5"
                value="O+"
                checked={this.state.bloodtype === "O+"}
                onChange={this.onChangeBloodtype}
              />
              <p>O-</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype6"
                value="O-"
                checked={this.state.bloodtype === "O-"}
                onChange={this.onChangeBloodtype}
              />
              <p>AB+</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype7"
                value="AB+"
                checked={this.state.bloodtype === "AB+"}
                onChange={this.onChangeBloodtype}
              />
              <p>AB-</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="ubloodtype8"
                value="AB-"
                checked={this.state.bloodtype === "AB-"}
                onChange={this.onChangeBloodtype}
              />
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label for="allergies">Allergies</label>
            <input
              type="text"
              className={styles["form-control"]}
              id="uallergies"
              value={this.state.allergies}
              onChange={this.onChangeAllergies}
            />
          </div>
          <div className={styles["form-group"]}>
            <label for="organ_donor">Organ Donor</label>
            <div className={styles.donor}>
              <p>Yes</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="uorgan_donor"
                value="yes"
                checked={this.state.organ_donor === "yes"}
                onChange={this.onChangeOrganDonor}
              />
              <p>No</p>
              <input
                type="radio"
                className={styles["form-control"]}
                id="uorgan_donor2"
                value="no"
                checked={this.state.organ_donor === "no"}
                onChange={this.onChangeOrganDonor}
              />
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label for="healthprobs">Other Health Problems</label>
            <input
              type="text"
              className={styles["form-control"]}
              id="uhealthprobs"
              value={this.state.healthprobs}
              onChange={this.onChangeHealthprobs}
            />
          </div>
          <div>
            <button type="submit" className={styles.button} id="btn-reg">
              Register
            </button>
            <Link to="/profile">
              <button type="button" className={styles.button} id="btn-reg">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
