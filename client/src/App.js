import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MainNav from "./components/nav-bar"
import Appointments from "./components/appointment.component";
import Homepage from "./components/homepage.component";
import Prescriptions from "./components/prescription.component";
import Profile from "./components/profile";
import ProtectedRoute from "./auth/protected-route";
import SignupForm from "./components/signup-form.component";

//always show navbar on each component page
//each component route path defined
function App () {

    return (
        <Router>
            <div className="container">
                <MainNav />
                <br/>
                <Route path="/" exact component={Homepage} />
                <Route path="/signup" exact component={SignupForm} />
                <ProtectedRoute path="/appointments" exact component={Appointments}/>
                <ProtectedRoute path="/prescriptions" exact component={Prescriptions}/>
                <ProtectedRoute path="/profile" exact component={Profile}/>
            </div>
        </Router>
    );
} 

export default App;