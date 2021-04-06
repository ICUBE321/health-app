import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state={
            user: {},
            details: []
        };
    }

    componentDidMount(){
        const user = localStorage.getItem('user');
        this.setState({ user: user });
        console.log("Local storage state in profile page: ");
        console.log(this.state.user);
        //this.userDetails();
    }

    userDetails =() => {
        const userDetails = localStorage.getItem('user');
        if(userDetails){
            console.log(this.state.user);
            axios.get('/api/detail/' + userDetails.id)
             .then((response) => {
                 const data = response.data;
                 this.setState({details: data});
                 console.log("displaying user's profile");
             })
             .catch((error) => { 
                 alert("Error displaying user's profile: " + error);
             });
        }
    }

    displayProfile = (details) => {
        if(!details.length) return null;
        return details.map((detail, index) => (
            <div key= {index}>
                <p>Date of Birth: <h3>{detail.DOB}</h3></p>
                <p>Height: <h3>{detail.height}</h3></p>
                <p>Weight: <h3>{detail.weight}</h3></p>
                <p>Blood Type: <h3>{detail.bloodtype}</h3></p>
                <p>Allergies: <h3>{detail.allergies}</h3></p>
                <p>Organ Donor: <h3>{detail.organdonor}</h3></p>
                <p>Other Health Problems: <h3>{detail.healthprobs}</h3></p>
            </div>
        ));
    };



    render() {
        return (
            <div>
                <div id="intro" className="mx-auto">
                    <h3><span className="badge badge-secondary">Profile Page</span></h3>
                </div>
                
                    <div>
                        { this.displayProfile(this.state.details) }
                    </div>

                    <Link to="/home" className="navbar-brand"><button type="submit" className="btn btn-primary btn-lg" id="btn_signup"> Back </button></Link>
            </div>
        )
    }
}

