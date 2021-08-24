import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Nav/navbar.component";
import Appointments from "./components/Appointment/appointment.component";
import Homepage from "./components/homepage.component";
import Prescriptions from "./components/Prescription/prescription.component";
import Login from "./components/Login/login.component";
import Profile from "./components/Patient/profile.component";
import DocLogin from "./components/Doctor/docsignin.component";
import Signup from "./components/Login/signup.component";
import Detail from "./components/Patient/detail.component";
import addAppointments from "./components/Appointment/addAppointment.component";
import addPrescription from "./components/Prescription/addPrescription.component";
import Patients from "./components/Doctor/patients.component";
import PatientDetail from "./components/Doctor/patientDetail.component";

//always show navbar on each component page
//each component route path defined
const App = () => {
  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/dlogin" exact component={DocLogin} />
        <Route path="/appointments" exact component={Appointments} />
        <Route path="/addAppointment" exact component={addAppointments} />
        <Route
          path="/addAppointment/edit/:id"
          exact
          component={addAppointments}
        />
        <Route path="/prescriptions" exact component={Prescriptions} />
        <Route path="/addPrescription" exact component={addPrescription} />
        <Route
          path="/addPrescription/edit/:id"
          exact
          component={addPrescription}
        />
        <Route path="/details" exact component={Detail} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/patients" exact component={Patients} />
        <Route path="/patientDetail/:id" exact component={PatientDetail} />
      </div>
    </Router>
  );
};

export default App;
