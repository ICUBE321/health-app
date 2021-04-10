import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeHealthcardno = this.onChangeHealthcardno.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        this.state = {
             firstname: '',
             lastname: '',
             healthcardno: "",
             email: '',
             password:''
        }

              
    }

    onChangeFirstname(e){
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e){
        this.setState({
            lastname: e.target.value
        });
    } 

    onChangeHealthcardno(e){
        this.setState({
            healthcardno: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onHandleSubmit(e){
        e.preventDefault();

        const reg = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            healthcardno: this.state.healthcardno,
            password:this.state.password
        };

        axios.post('/api/auth/signup', reg)
             .then(res => {
                window.location = "/login";
                console.log(res.data)
             }).catch(error => {
                 console.log(error.response.data);
                 window.alert(error.response.data);
                });
    }

    render() {
        return (
            <div>
                <div id="intro" className="mx-auto">
                    <h3><span className="badge badge-secondary">REGISTER</span></h3>
                </div>

                <div>
                    <form onSubmit={this.onHandleSubmit} id="regform" method="post">
                        <div className="form-group">
                            <label for="firstname">First Name</label>
                            <input type="text" placeholder="John" className="form-control" id="fname" value={this.state.firstname} onChange={this.onChangeFirstname} required/>
                        </div>

                        <div className="form-group">
                            <label for="lastname">Last Name</label>
                            <input type="text" placeholder="Doe" className="form-control" id="lname" value={this.state.lastname} onChange={this.onChangeLastname} required/>
                        </div>

                        <div className="form-group">
                            <label for="hcn">Healthcard Number</label>
                            <input type="text" placeholder="1234567890CA" pattern="^[1-9]{10}[A-Z]{2}$" className="form-control" id="uhcn" value={this.state.healthcardno} onChange={this.onChangeHealthcardno} required/>
                        </div>

                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" placeholder="johndoe@email.com" className="form-control" id="uemail" value={this.state.email} onChange={this.onChangeEmail} required/>
                        </div>

                        <div className="form-group">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="upass" value={this.state.password} onChange={this.onChangePassword} required/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" id="btn-reg">Register</button>
                    </form>
                </div>
                
            </div>
        )
    }
}