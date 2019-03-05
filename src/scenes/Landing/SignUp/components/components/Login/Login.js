import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

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
    this.changeTab = this.changeTab.bind(this);
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

  changeTab(event) {
    event.preventDefault();
    this.props.update('1');
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
            <FormGroup className="form-label-group mb-4">
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

            <div className="row mb-4">
              <div className="col col-12 col-sm-6">
                <FormGroup check>
                  <Label className="color-link" check>
                    <Input type="checkbox" value="1" check="checked"/> Remember me
                  </Label>
                </FormGroup>
              </div>
              <div className="col col-12 col-sm-6 reset-password">
                <a href="#" className="color-link">
                  Forgot my password
                </a>
              </div>
            </div>

            <Button
              className="tab-section-btn mb-4"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
            <div className="or" />
            <Button className="tab-section-btn bg-facebook mb-2">
              <FaFacebookF className="icon" />
              Login with Facebook
            </Button>
            <Button className="tab-section-btn bg-twitter mb-3">
              <FaTwitter className="icon" />
              Login with Twitter
            </Button>
            <p className="tab-section-message">
              Don’t you have an account?{' '}
              <a href="" onClick={this.changeTab}>
                Register Now!
              </a>{' '}
              it’s really simple and you can start enjoing all the benefits!
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  update: PropTypes.func
};
