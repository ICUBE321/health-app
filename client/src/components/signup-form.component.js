// //button for signing up users

import React, { Component } from "react";
import "./auth0-form.css";
import LoginButton from "./login-button";

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <div>
                <div>
                    <div class="login-header">
                        <h3>Welcome</h3>
                        <h5>PLEASE SIGN UP</h5>
                    </div>
                    <div id="error-message" class="alert alert-danger"></div>
                    <form onsubmit="return false;" method="post">
                        <div class="form-group">
                            <label for="name">Health Card Number</label>
                            <input
                                type="text"
                                class="form-control"
                                id="healthcardno"
                                placeholder="Enter your Health Card Number" />
                        </div>
                        <div class="form-group">
                            <label for="name">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Enter your password" />
                        </div>
                        <button className="btn btn-primary">
                                Sign Up
                        </button>
                        <hr/>
                        <LoginButton/>
                        <hr/>
                    </form>
                </div>
            </div>
        );
    };
}
