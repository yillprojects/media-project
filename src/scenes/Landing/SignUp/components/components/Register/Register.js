import React, { Component } from "react";
import { connect } from "react-redux";

import passwordValidator from "password-validator";

import { authenticationActions, alertActions } from "redux/actions/index.js";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

import config from "./config/password.config.js";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        username: "",
        password: "",
        checkbox: false
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    const { user } = this.state;

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      submitted: true
    });

    const { user } = this.state;
    const { dispatch } = this.props;

    const isPasswordValid = this.passwordValidation();

    if (
      user.email &&
      user.username &&
      user.password &&
      user.checkbox &&
      isPasswordValid
    ) {
      dispatch(authenticationActions.register(user));
    }
  }

  passwordValidation() {
    const { user } = this.state;
    const { dispatch } = this.props;

    let isPasswordValid = true;

    for (let i = 0; i < config.length; i++) {
      if (!config[i].try.validate(user.password)) {
        dispatch(alertActions.error(config[i].error));
        isPasswordValid = false;
      }
    }

    return isPasswordValid;
  }

  render() {
    const { user, submitted } = this.state;
    const { registering, alert } = this.props;

    return (
      <div className="tab-section registration">
        <div className="container">
          <h2 className="tab-section-title">
            Register to our biggest social media!
          </h2>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup
              className={`form-label-group ${
                submitted && !user.username ? "has-error" : ""
              }`}
            >
              <Input
                name="username"
                id="register-username"
                placeholder={
                  submitted && !user.username
                    ? "Username is required"
                    : "Username"
                }
                value={user.username}
                onChange={this.handleChange}
              />
              <Label for="register-username">
                {submitted && !user.username
                  ? "Username is requered"
                  : "Username"}
              </Label>
            </FormGroup>
            <FormGroup
              className={`form-label-group ${
                submitted && !user.email ? "has-error" : ""
              }`}
            >
              <Input
                type="email"
                name="email"
                id="register-email"
                placeholder={
                  submitted && !user.email ? "Email is required" : "Email"
                }
                value={user.email}
                onChange={this.handleChange}
              />
              <Label for="register-email">
                {submitted && !user.email ? "Email is requered" : "Email"}
              </Label>
            </FormGroup>
            <FormGroup
              className={`form-label-group mb-4 ${
                submitted && !user.password ? "has-error" : ""
              }`}
            >
              <Input
                type="password"
                name="password"
                id="register-password"
                placeholder={
                  submitted && !user.password
                    ? "Password is required"
                    : "Password"
                }
                value={user.password}
                onChange={this.handleChange}
              />
              <Label for="register-password">
                {submitted && !user.password
                  ? "Password is requered"
                  : "Password"}
              </Label>
            </FormGroup>
            <FormGroup
              className={`mb-4 ${
                submitted && !user.checkbox ? "has-error" : ""
              }`}
              check
            >
              <Label className="color-link" check>
                <Input
                  type="checkbox"
                  name="checkbox"
                  onChange={this.handleChange}
                />{" "}
                I accept the{" "}
                <a href="#" className="color-link">
                  Terms and Conditions
                </a>{" "}
                of the website
              </Label>
            </FormGroup>
            <Button
              className="tab-section-btn"
              disabled={registering}
              onClick={this.handleSubmit}
            >
              {registering ? (
                <div className="loading-panel">
                  <CircularProgress
                    color="primary"
                    style={{ height: 19, width: 20 }}
                  />
                </div>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { registering } = state.registration;
  const { alert } = state.alert;

  return {
    registering,
    alert
  };
};

export default connect(mapStateToProps)(Register);
