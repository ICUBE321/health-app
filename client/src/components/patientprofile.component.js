import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class DocLogin extends Component {
    constructor(props) {
        super(props);

        this.onChangePatientName = this.onChangePatientName.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onChangeDocID = this.onChangeDocID.bind(this);

        this.state = {
            docid: '',
            patientname: ''
        };
    }

    onChangeDocID(e){
        this.setState({
            docid: e.target.value
        });
    }

    onChangePatientName(e){
        this.setState({
            patientname: e.target.value
        });
    }

    

    onHandleSubmit(e){
        e.preventDefault();

        const viewprof = {
            docid: this.state.docid,
            patientname: this.state.patientname

        };
        console.log(viewprof);
       
      
    }

    render() {
        return (
            <div>
                <div id="intro" className="mx-auto">
                <h3><span className="badge badge-secondary">DOCTOR LOGIN</span></h3>
                </div>

                <div>
                <form onSubmit={this.onHandleSubmit} id="viewprofile" method="post">
                

                    <div className="form-group">
                        <label for="docid">Doctor's ID</label>
                        <input type="number" maxLength="4" minLength="4" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control" id="did" value={this.state.docid} onChange={this.onChangeDocID}/>
                    </div>

                    <div className="form-group">
                        <label for="patient_name">Patient's Name</label>
                        <input type="text" className="form-control" id="upass" value={this.state.patientname} onChange={this.onChangePatientName}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" id="btn-signin">Login</button>
                </form>
            </div>
            
        </div>
          
        );
    }
}