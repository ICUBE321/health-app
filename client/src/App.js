import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component"
import Appointments from "./components/appointment.component";
import Homepage from "./components/homepage.component";
import Prescriptions from "./components/prescription.component";
import Login from "./components/login.component";
import FindClinic from "./components/findclinic.component";
import FindLab from "./components/findlab.component";
import Profile from "./components/profile.component";
import DocLogin from "./components/docsignin.component";
import Signup from "./components/signup.component";
import Detail from "./components/detail.component";
import addAppointments from "./components/addAppointment.component";
import addPrescription from "./components/addPrescription.component";

//always show navbar on each component page
//each component route path defined
function App () {


    return (
        <Router>
            <div className="container">
                <Navbar />
                <br/>
                <Route path="/" exact component={Homepage} />
                <Route path="/appointments" exact component={Appointments}/>
                <Route path="/addAppointment" exact component={addAppointments}/>
                <Route path="/addAppointment/edit/:id" exact component={addAppointments}/>
                <Route path="/prescriptions" exact component={Prescriptions}/>
                <Route path="/addPrescription" exact component={addPrescription}/>
                <Route path="/addPrescription/edit/:id" exact component={addPrescription}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/dlogin" exact component={DocLogin}/>
                <Route path="/details" exact component={Detail}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/findclinic" exact component={FindClinic}/>
                <Route path="/findlab" exact component={FindLab}/>
            </div>
        </Router>
    );
} 

export default App;