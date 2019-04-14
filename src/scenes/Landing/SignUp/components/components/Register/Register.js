import React, { Component } from 'react';
import axios from 'axios';

import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        username: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
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
    axios
      .post("http://localhost:8000/api/", {
        ...this.state.user,
        appointment: 'register'
      })
      .then(res => alert(res.data.message))
      .catch(err => console.log(err));
  }

  render() {
    const { user, submitted } = this.state;

    return (
      <div className="tab-section registration">
        <div className="container">
          <h2 className="tab-section-title">

            Register to our biggest social media!
          </h2>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="form-label-group">
              <Input
                name="username"
                id="register-username"
                placeholder={
                  submitted && !user.username
                    ? 'Username is required'
                    : 'Username'
                }
                value={user.username}
                onChange={this.handleChange}
              />
              <Label for="register-username">Username</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="email"
                name="email"
                id="register-email"
                placeholder={
                  submitted && !user.email ? 'Email is required' : 'Email'
                }
                value={user.email}
                onChange={this.handleChange}
              />
              <Label for="register-email">Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group mb-4">
              <Input
                type="password"
                name="password"
                id="register-password"
                placeholder={
                  submitted && !user.password
                    ? 'Password is required'
                    : 'Password'
                }
                value={user.password}
                onChange={this.handleChange}
              />
              <Label for="register-password">Password</Label>
            </FormGroup>
            <FormGroup className="mb-4" check>
              <Label className="color-link" check>
                <Input type="checkbox" />
                {' '}
I accept the
                {' '}
                <a href="#" className="color-link">

                  Terms and Conditions
                </a>
                {' '}

                of the website
              </Label>
            </FormGroup>
            <Button className="tab-section-btn" onClick={this.handleSubmit}>

              Complete Registration
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
