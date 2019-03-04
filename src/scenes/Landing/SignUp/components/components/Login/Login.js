import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };
  }

  render() {
    const { username, password, submitted } = this.state;

    return (
      <div className="tab-section">
        <div className="container">
          <h2 className="tab-section-title">
            Welcome
            <span>back!</span>
          </h2>

          <Form>
            <FormGroup className="form-label-group">
              <Input
                name="username"
                id="login-username"
                placeholder="Username"
              />
              <Label for="login-username">Username</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="password"
                name="password"
                id="login-password"
                placeholder="password"
              />
              <Label for="login-password">Password</Label>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
