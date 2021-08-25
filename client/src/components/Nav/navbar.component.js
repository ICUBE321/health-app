import React, { useState, Component } from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./navbar.module.css";

const Navbar = () => {
  // this.state = {
  //   user: ,
  //   doctor: ,

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [doctor, setDoctor] = useState(localStorage.getItem("doctor"));
  const [mobileNavClass, setMobileNavClass] = useState("");

  const openMobileNav = () => {
    if (mobileNavClass === "") {
      setMobileNavClass("open");
    } else {
      setMobileNavClass("");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  if (user && user.length > 0) {
    return (
      <nav className={`${styles["navbar"]}`}>
        <NavLink to="/" className={`${styles["brand"]}`}>
          Health App
        </NavLink>
        <a
          className={`${styles.icon} ${styles[mobileNavClass]}`}
          onClick={openMobileNav}
        >
          &#9776;
        </a>
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
              onClick={handleLogout}
              className={`${styles.link} "nav-link"`}
            >
              Logout
            </Link>
          </li>
        </ul>
        <div className={`${styles["mobile-nav"]} ${styles[mobileNavClass]}`}>
          <NavLink
            to="/profile"
            className={styles["mobile-nav__item"]}
            onClick={openMobileNav}
          >
            Profile
          </NavLink>
          <NavLink
            to="/appointments"
            className={styles["mobile-nav__item"]}
            onClick={openMobileNav}
          >
            Your Appointments
          </NavLink>
          <NavLink
            to="/prescriptions"
            className={styles["mobile-nav__item"]}
            onClick={openMobileNav}
          >
            Your Prescriptions
          </NavLink>
          <Link onClick={handleLogout} className={styles["mobile-nav__item"]}>
            Logout
          </Link>
        </div>
      </nav>
    );
  } else if (doctor && doctor.length > 0) {
    return (
      <nav className={`${styles["navbar"]}`}>
        <NavLink to="/" className={`${styles["brand"]}`}>
          Health App
        </NavLink>
        <a
          className={`${styles.icon} ${styles[mobileNavClass]}`}
          onClick={openMobileNav}
        >
          &#9776;
        </a>
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
              onClick={handleLogout}
              className={`${styles.link} "nav-link"`}
            >
              Logout
            </Link>
          </li>
        </ul>
        <div className={`${styles["mobile-nav"]} ${styles[mobileNavClass]}`}>
          <NavLink
            to="/patients"
            className={styles["mobile-nav__item"]}
            onClick={openMobileNav}
          >
            Patients
          </NavLink>
          <NavLink
            to="/appointments"
            className={styles["mobile-nav__item"]}
            onClick={openMobileNav}
          >
            Patient Appointments
          </NavLink>
          <NavLink
            to="/prescriptions"
            className={styles["mobile-nav__item"]}
            onClick={openMobileNav}
          >
            Patient Prescriptions
          </NavLink>
          <Link onClick={handleLogout} className={styles["mobile-nav__item"]}>
            Logout
          </Link>
        </div>
      </nav>
    );
  }
  return (
    <nav className={`${styles["navbar"]}`}>
      <NavLink to="/" className={`${styles["brand"]}`}>
        Health App
      </NavLink>
      <a
        className={`${styles.icon} ${styles[mobileNavClass]}`}
        onClick={openMobileNav}
      >
        &#9776;
      </a>
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
      <div className={`${styles["mobile-nav"]} ${styles[mobileNavClass]}`}>
        <NavLink
          to="/login"
          className={styles["mobile-nav__item"]}
          onClick={openMobileNav}
        >
          Patient Login
        </NavLink>
        <NavLink
          to="/signup"
          className={styles["mobile-nav__item"]}
          onClick={openMobileNav}
        >
          Create an Account
        </NavLink>
        <NavLink
          to="/dlogin"
          className={styles["mobile-nav__item"]}
          onClick={openMobileNav}
        >
          Doctor's Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
