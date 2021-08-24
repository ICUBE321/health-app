import React, { Component } from "react";
import axios from "axios";

import shared from "../shared.module.css";
import styles from "./login.module.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      username: "",
      password: "",
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({ user: user });
    this.goToDetails();
  }

  goToDetails() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      window.location = "/profile";
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handlSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    //send the username and password to server
    axios
      .post("/api/auth/login", user)
      .then((res) => {
        var items = [];
        items.push(res.data.userId);
        items.push(res.data.token);
        items.push(res.data.firstname);
        localStorage.setItem("user", JSON.stringify(items));
        this.setState({
          user: res.data,
        });
        //console.log(r);
        this.goToDetails();
      })
      .catch((error) => {
        console.log(error.response.data);
        window.alert(error.response.data);
      });
  };

  //if no user, show login form
  render() {
    return (
      <div className={`${shared["container-div"]} ${styles.login}`}>
        <h3 className={styles.label}>USER LOGIN</h3>
        <form
          className={styles["login-form"]}
          onSubmit={this.handlSubmit}
          id="uloginform"
          method="post"
        >
          <div className={styles["input-group"]}>
            <label for="hcn">Health Card Number</label>
            <input
              type="text"
              maxLength="12"
              minLength="12"
              pattern="^[1-9]{10}[A-Z]{2}$"
              placeholder="1234567890CA"
              className="form-control"
              id="uhcn"
              value={this.state.username}
              onChange={this.onChangeUsername}
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="upass"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <button
            type="submit"
            className={styles["login-button"]}
            id="btn-signin"
          >
            LOGIN
          </button>
        </form>
      </div>
    );
  }
}
