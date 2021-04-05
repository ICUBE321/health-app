import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { AppContext } from "./libs/contextLib";
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
//import useToken from "./useToken";

//always show navbar on each component page
//each component route path defined
function App () {

    
    
    // //call useState in custom hook(useToken) to trigger component 
    // //re-render
    // const { token, setToken } = useToken();

    // //display login if token is false
    // if(!token) {
    //     //pass setToken function to Login component
    //     return <Login setToken={setToken} />
    // }

    return (
        <Router>
            <div className="container">
                <Navbar />
                <br/>
                <Route path="/home" exact component={Homepage} />
                <Route path="/appointments" exact component={Appointments}/>
                <Route path="/prescriptions" exact component={Prescriptions}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/findclinic" exact component={FindClinic}/>
                <Route path="/findlab" exact component={FindLab}/>
                <Route path="/details" exact component={Detail}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/dlogin" exact component={DocLogin}/>


            </div>
        </Router>
    );
} 

export default App;