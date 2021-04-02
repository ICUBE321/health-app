import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import Appointments from "./components/appointment.component";
import Homepage from "./components/homepage.component";
import Prescriptions from "./components/prescription.component";
import Login from "./components/login.component";
import useToken from "./useToken";
import addPrescription from "./components/addPrescription.component";
import addAppointments from "./components/addAppointment.component";

//always show navbar on each component page
//each component route path defined
function App () {
    
    //call useState in custom hook(useToken) to trigger component 
    //re-render
    const { token, setToken } = useToken();

    //display login if token is false
    if(!token) {
        //pass setToken function to Login component
        return <Login setToken={setToken} />
    }

    return (
        <Router>
            <div className="container">
                <Navbar />
                <br/>
                <Route path="/" exact component={Homepage} />
                <Route path="/appointments" exact component={Appointments}/>
                <Route path="/addAppointment" exact component={addAppointments}/>
                <Route path="/prescriptions" exact component={Prescriptions}/>
                <Route path="/addPrescription" exact component={addPrescription}/>
            </div>
        </Router>
    );
} 

export default App;