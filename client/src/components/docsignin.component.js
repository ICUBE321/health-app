import axios from 'axios';
import React, { Component } from 'react';

export default class DocLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doctor: '',
            hospitalcode: Number,
            docid: Number,
            password: ''
        };

        this.onChangeHospitalCode = this.onChangeHospitalCode.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onChangeDocID = this.onChangeDocID.bind(this);
    }

    componentDidMount() {
        const doctor = localStorage.getItem('doctor');
        this.setState({ doctor: doctor });
        this.goToNext();
    }

    goToNext() {
        const loggedInDoctor = localStorage.getItem('doctor');
        if(loggedInDoctor) {
            window.location = "/";
        }
    }

    onChangeDocID(e){
        this.setState({
            docid: parseInt(e.target.value)
        });
    }

    onChangeHospitalCode(e){
        this.setState({
            hospitalcode: parseInt(e.target.value)
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onHandleSubmit(e){
        e.preventDefault();

        const doctor = {
            hospitalcode: this.state.hospitalcode,
            doctorId: this.state.docid,
            password: this.state.password,
        };

        axios.post("/api/doctor/auth/login", doctor)
            .then(res => {
                var items = [];
                items.push(res.data.doctorRecordId);
                items.push(res.data.token);
                items.push(res.data.doctorId);
                localStorage.setItem('doctor', JSON.stringify(items));
                this.setState({
                    doctor: res.data,
                });
                this.goToNext();
            })
                .catch(error => {
                    console.log(error.response.data);
                    window.alert(error.response.data);
                })
    };

    //if no doctor is logged, in show form
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