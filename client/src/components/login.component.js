import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';



export default class Login extends Component                            {
    constructor(props){
        super(props);

        this.onChangeHealthcardno = this.onChangeHealthcardno.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        this.state={
            healthcardno: '',
            password: ''

        }
    }

    onChangeHealthcardno(e){
        this.setState({
            healthcardno: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onHandleSubmit(e){
        e.preventDefault();

        const signin = {
            healthcardno: this.state.healthcardno,
            password: this.state.password
        };
    }

    


    render(){
        return(
            <div>
            <div id="intro" className="mx-auto">
                <h3><span className="badge badge-secondary">USER LOGIN</span></h3>
            </div>

            <div>
                <form onSubmit={this.onHandleSubmit} id="uloginform" method="post">
                    <div className="form-group">
                        <label for="hcn">Healthcard Number</label>
                        <input type="number" maxLength="10" minLength="10" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control" id="uhcn" value={this.state.healthcardno} onChange={this.onChangeHealthcardno}/>
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