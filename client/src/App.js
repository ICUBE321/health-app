import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import Appointments from "./components/appointment.component";
import Homepage from "./components/homepage.component";

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
                </div>
            </Router>
        );
} 

export default App;