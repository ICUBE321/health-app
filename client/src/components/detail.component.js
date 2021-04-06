import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.onChangeDOB= this.onChangeDOB.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeBloodtype = this.onChangeBloodtype.bind(this);
        this.onChangeAllergies = this.onChangeAllergies.bind(this);
        this.onChangeOrganDonor = this.onChangeOrganDonor.bind(this);
        this.onChangeHealthprobs = this.onChangeHealthprobs.bind(this);
        this.onHandleSubmit =  this.onHandleSubmit.bind(this);

        this.state = {
            DOB: '',
            weight: '',
            height: '',
            bloodtype: [],
            allergies: '',
            organ_donor: [],
            healthprobs: ''
        }
    }

    onChangeDOB(e){
        this.setState({
           DOB: e.target.value
        });
    }

    onChangeAllergies(e){
        this.setState({
            allergies: e.target.value
        });
    }

    onChangeBloodtype(e){
        this.setState({
            bloodtype: e.target.value
        });
    }

    onChangeHealthprobs(e){
        this.setState({
            healthprobs: e.target.value
        });
    }

    onChangeHeight(e){
        this.setState({
            height: e.target.value
        });
    }
    onChangeOrganDonor(e){
      this.setState({
          organ_donor: e.target.value
      });

    }

    onChangeWeight(e){
        this.setState({
            weight: e.target.value
        });
    }

    onHandleSubmit(e){
        e.preventDefault();

        const details ={
            DOB: this.state.DOB,
            height: this.state.height,
            weight: this.state.weight,
            bloodtype: this.state.bloodtype,
            allergies: this.state.allergies,
            organ_donor: this.state.organ_donor,
            healthprobs: this.state.healthprobs
        };

        axios.post('/detail/add', details)
             .then(res => console.log(res.data));
            
        window.location = "/home";
    }

    render() {
        return (
            <div>
                <div id="intro" className="mx-auto">
                    <h3><span className="badge badge-secondary">FILL IN YOUR INFORMATION(all fields are required)</span></h3>
                </div>

                <div>
                    <form onSubmit={this.onHandleSubmit} id="regform" method="post">
                        <div className="form-group">
                            <label for="dob">Date of Birth</label>
                            <input type="Date" className="form-control" id="dob" value={this.state.DOB} onChange={this.onChangeDOB}/>
                        </div>

                        <div className="form-group">
                            <label for="weight">Weight</label>
                            <input type="number" className="form-control" id="uweight" value={this.state.weight} onChange={this.onChangeWeight}/>
                        </div>

                        <div className="form-group">
                            <label for="height">Height</label>
                            <input type="number" className="form-control" id="uheight" value={this.state.height} onChange={this.onChangeHeight}/>
                        </div>

                        <div className="form-group">
                            <label for="bloodtype">Bloodtype</label>
                                <p>A+<input type="radio" className="form-control" id="ubloodtype1" value="A+" checked={this.state.bloodtype === "A+"} onChange={this.onChangeBloodtype}/> </p><br/>
                                <p>A-<input type="radio" className="form-control" id="ubloodtype2" value="A-" checked={this.state.bloodtype === "A-"} onChange={this.onChangeBloodtype}/></p><br/>
                                <p>B+<input type="radio" className="form-control" id="ubloodtype3" value="B+" checked={this.state.bloodtype === "B+"} onChange={this.onChangeBloodtype}/></p><br/>
                                <p>B-<input type="radio" className="form-control" id="ubloodtype4" value="B-" checked={this.state.bloodtype === "B-"} onChange={this.onChangeBloodtype}/></p><br/>
                                <p>O+<input type="radio" className="form-control" id="ubloodtype5" value="O+" checked={this.state.bloodtype === "O+"} onChange={this.onChangeBloodtype}/></p><br/>
                                <p>O-<input type="radio" className="form-control" id="ubloodtype6" value="O-" checked={this.state.bloodtype === "O-"} onChange={this.onChangeBloodtype}/></p><br/>
                                <p>AB+<input type="radio" className="form-control" id="ubloodtype7" value="AB+" checked={this.state.bloodtype === "AB+"} onChange={this.onChangeBloodtype}/></p><br/>
                                <p>AB-<input type="radio" className="form-control" id="ubloodtype8" value="AB-" checked={this.state.bloodtype === "AB-"} onChange={this.onChangeBloodtype}/></p>
                            
                        </div>

                        <div className="form-group">
                            <label for="allergies">Allergies</label>
                            <input type="text" className="form-control" id="uallergies" value={this.state.allergies} onChange={this.onChangeAllergies}/>
                        </div>

                        <div className="form-group">
                            <label for="organ_donor">Organ Donor</label>
                            <p>Yes<input type="radio" className="form-control" id="uorgan_donor" value="yes" checked={this.state.organ_donor === "yes"} onChange={this.onChangeOrganDonor}/></p><br/>
                            <p>No<input type="radio" className="form-control" id="uorgan_donor2" value="no" checked={this.state.organ_donor === "no"} onChange={this.onChangeOrganDonor}/></p>
                        </div>

                        <div className="form-group">
                            <label for="healthprobs">Other Health Problems</label>
                            <input type="text" className="form-control" id="uhealthprobs" value={this.state.healthprobs} onChange={this.onChangeHealthprobs}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" id="btn-reg">Register</button>
                    </form>
                </div>
                
            </div>
        )
    }
}