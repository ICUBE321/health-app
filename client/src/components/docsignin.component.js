import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class DocLogin extends Component {
    constructor(props) {
        super(props);

        onChangeHospitalCode = this.onChangeHospitalCode.bind(this);
        onChangePassword = this.onChangePassword.bind(this);
        onHandleSubmit = this.onHandleSubmit.bind(this);
        onChangeDocID = this.onChangeDocID.bind(this);

        this.state = {
            hospitalcode: '',
            docid: '',
            password: ''
        };
    }

    onChangeDocID(e){
        this.setState({
            docid: e.target.value
        });
    }

    onChangeHospitalCode(e){
        this.setState({
            hospitalcode: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onHandleSubmit(e){
        e.preventDefault();

        const docsignin = {
            hospitalcode: this.state.hospitalcode,
            docid: this.state.docid,
            password: this.state.password

        };
        axios
    }

    render() {
        return (
            <div>
                <div id="intro" className="mx-auto">
                <h3><span className="badge badge-secondary">DOCTOR LOGIN</span></h3>
                </div>

                <div>
                <form onSubmit={this.onHandleSubmit} id="dloginform" method="post">
                <div className="form-group">
                        <label for="hospitalcode">Hospital Code</label>
                        <input type="number" maxLength="6" minLength="6" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control" id="dhc" value={this.state.hospitalcode} onChange={this.onChangeHospitalCode}/>
                    </div>

                    <div className="form-group">
                        <label for="docid">Doctor's ID</label>
                        <input type="number" maxLength="4" minLength="4" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control" id="did" value={this.state.docid} onChange={this.onChangeDocID}/>
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="upass" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" id="btn-signin">Login</button>
                </form>
            </div>
            
        </div>
          
        );
    }
}