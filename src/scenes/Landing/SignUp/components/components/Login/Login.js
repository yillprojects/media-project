import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { authenticationActions } from 'redux/actions/index.js';

import PropTypes from 'prop-types';

import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';

import { FaFacebookF, FaTwitter } from 'react-icons/fa';

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      checked: false,
      submitted: false,
      loggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCheckboxChange = event => {
    const { checked } = this.state;
    this.setState({
        checked: !checked
    })
  };

  handleSubmit(event) {
    event.preventDefault();

    const { username, password, checked } = this.state;
    const { dispatch } = this.props;

    if (username && password) {

      dispatch(authenticationActions.login(username, password, checked));
    }

    this.setState({
      submitted: true
    });
  }

  changeTab(event) {
    event.preventDefault();
    this.props.update('1');
  }

  render() {
    const { username, password, submitted } = this.state;
    const { loggingIn, loggedIn } = this.props;

    return (
      <div className="tab-section">
        <div className="container">
          <h2 className="tab-section-title">


            Welcome
            <span>back!</span>
          </h2>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup
              className={`form-label-group ${
                submitted && !username ? 'has-error' : ''
              }`}
            >
              <Input
                name="username"
                id="login-username"
                placeholder={
                  submitted && !username ? 'Username is required' : 'Username'
                }
                value={username}
                onChange={this.handleChange}
              />
              <Label for="login-username">
                {' '}
                {submitted && !username ? 'Username is requered' : 'Username'}
              </Label>
            </FormGroup>
            <FormGroup
              className={`form-label-group mb-4 ${
                submitted && !password ? 'has-error' : ''
              }`}
            >
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
              <Label for="login-password">
                {' '}
                {submitted && !password ? 'Password is requered' : 'Password'}
              </Label>
            </FormGroup>

            <div className="row mb-2">
              <div className="col col-12 col-sm-6">
                <FormGroup check>
                  <Label className="color-link" check>
                    <Input type="checkbox" onChange={this.handleCheckboxChange} />
                    {' '}
                    Remember me
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
              className="tab-section-btn mb-3"
              onClick={this.handleSubmit}
              disabled={loggingIn}
            >
              {loggingIn ? (
                <div className="loading-panel">
                  <CircularProgress
                    color="primary"
                    style={{ height: 19, width: 20 }}
                  />
                </div>
              ) : (
                'Login'
              )}
              {' '}
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


              Don’t you have an account?
              {' '}
              <a href="#" onClick={this.changeTab}>


                Register Now!
              </a>
              {' '}


              it’s really simple and you can start enjoing all the benefits!
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn, loggedIn } = state.authentication;

  return {
    loggingIn,
    loggedIn
  };
};

export default connect(mapStateToProps)(Login);

Login.propTypes = {
  update: PropTypes.func
};
