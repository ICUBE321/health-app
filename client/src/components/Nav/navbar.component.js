import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./navbar.module.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem("user"),
      doctor: localStorage.getItem("doctor"),
    };
  }

  handleLogout() {
    localStorage.clear();
    window.location = "/";
  }

  render() {
    if (this.state.user && this.state.user.length > 0) {
      return (
        <nav className={`${styles["navbar"]}`}>
          <NavLink to="/" className={`${styles["brand"]}`}>
            Health App
          </NavLink>
          <ul className={styles["nav-list"]}>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <NavLink
                activeClassName={styles["active-link"]}
                to="/profile"
                className={`${styles.link} "nav-link"`}
              >
                Profile
              </NavLink>
            </li>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <NavLink
                activeClassName={styles["active-link"]}
                to="/appointments"
                className={`${styles.link} "nav-link"`}
              >
                Your Appointments
              </NavLink>
            </li>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <NavLink
                activeClassName={styles["active-link"]}
                to="/prescriptions"
                className={`${styles.link} "nav-link"`}
              >
                Your Prescriptions
              </NavLink>
            </li>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <Link
                // activeClassName={styles["active-link"]}
                onClick={this.handleLogout}
                className={`${styles.link} "nav-link"`}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else if (this.state.doctor && this.state.doctor.length > 0) {
      return (
        <nav className={`${styles["navbar"]}`}>
          <NavLink to="/" className={`${styles["brand"]}`}>
            Health App
          </NavLink>
          <ul className={`${styles["nav-list"]}`}>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <NavLink
                activeClassName={styles["active-link"]}
                to="/patients"
                className={`${styles.link} "nav-link"`}
              >
                Patients
              </NavLink>
            </li>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <NavLink
                activeClassName={styles["active-link"]}
                to="/appointments"
                className={`${styles.link} "nav-link"`}
              >
                Patient Appointments
              </NavLink>
            </li>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <NavLink
                activeClassName={styles["active-link"]}
                to="/prescriptions"
                className={`${styles.link} "nav-link"`}
              >
                Patient Prescriptions
              </NavLink>
            </li>
            <li className={`${styles["list-item"]} "navbar-item"`}>
              <Link
                // activeClassName={styles["active-link"]}
                onClick={this.handleLogout}
                className={`${styles.link} "nav-link"`}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
    return (
      <nav className={`${styles["navbar"]}`}>
        <NavLink to="/" className={`${styles["brand"]}`}>
          Health App
        </NavLink>
        <ul className={`${styles["nav-list"]}`}>
          <li className={`${styles["list-item"]} "navbar-item"`}>
            <NavLink
              activeClassName={styles["active-link"]}
              to="/login"
              className={`${styles.link} "nav-link"`}
            >
              Patient Login
            </NavLink>
          </li>
          <li className={`${styles["list-item"]} "navbar-item"`}>
            <NavLink
              activeClassName={styles["active-link"]}
              to="/signup"
              className={`${styles.link} "nav-link"`}
            >
              Create an Account
            </NavLink>
          </li>
          <li className={`${styles["list-item"]} "navbar-item"`}>
            <NavLink
              activeClassName={styles["active-link"]}
              to="/dlogin"
              className={`${styles.link} "nav-link"`}
            >
              Doctor's Login
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
