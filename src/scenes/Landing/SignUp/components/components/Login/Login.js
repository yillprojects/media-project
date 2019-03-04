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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
  }

  render() {
    const { username, password, submitted } = this.state;

    return (
      <div className="tab-section">
        <div className="container">
          <h2 className="tab-section-title">
            Welcome <span>back!</span>
          </h2>

          <Form>
            <FormGroup className="form-label-group">
              <Input
                name="username"
                id="login-username"
                placeholder={
                  submitted && !username ? 'Username is required' : 'Username'
                }
                value={username}
                onChange={this.handleChange}
              />
              <Label for="login-username">Username</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="password"
                name="password"
                id="login-password"
                placeholder={
                  submitted && !password ? 'Password is required' : 'Password'
                }
                value={password}
                onChange={this.handleChange}
              />
              <Label for="login-password">Password</Label>
            </FormGroup>

            <div className="row">
              <div className="col col-12 col-sm-6">
                <FormGroup check>
                  <Label className="color-link" check>
                    <Input type="checkbox" /> Remember me
                  </Label>
                </FormGroup>
              </div>
              <div className="col col-12 col-sm-6 reset-password">
                <a href="#" className="color-link">Forgot my password</a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
