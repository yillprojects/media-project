import axios from 'axios';

import { authenticationConstants } from '../constants/authentication.constants';
import { alertActions } from './alert.actions';

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    axios
      .post('http://localhost:8000/api/users/register/', {
        ...user
      })
      .then((user) => {
        if (user.data.success) {
          dispatch(success(user.data.user));
          dispatch(alertActions.success('Registration successful'));
        } else {
          dispatch(failure(user.data.message));
          dispatch(alertActions.error(user.data.message));
        }
        console.log(user);
      })
      .catch((err) => {
        dispatch(failure(err));
        dispatch(alertActions.error('There was an error'));
        console.log(err);
      });
  };

  function request(user) {
    return {
      type: authenticationConstants.REGISTER_REQUEST,
      payload: user
    };
  }
  function success(user) {
    return { type: authenticationConstants.REGISTER_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: authenticationConstants.REGISTER_FAILURE, payload: error };
  }
}

function login(username, password) {
  return (dispatch) => {
    dispatch(request(username));

    axios
      .post('http://localhost:8000/api/users/check/', {
        username,
        password,
      })
      .then((user) => {
        if (user.data.success) {
          dispatch(success(username));
        } else {
          dispatch(failure(user.data.message));
          dispatch(alertActions.error(user.data.message));
        }
      })
      .catch((err) => {
        dispatch(failure(err));
        dispatch(alertActions.error('There was an error'));
        console.log(JSON.stringify(err));
      });
  };

  function request(user) {
    return { type: authenticationConstants.LOGIN_REQUEST, payload: user };
  }
  function success(user) {
    return { type: authenticationConstants.LOGIN_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: authenticationConstants.LOGIN_FAILURE, payload: error };
  }
}

function logout() {
  return {
    type: authenticationConstants.LOGOUT,
  };
}

export const authenticationActions = {
  register,
  login,
  logout
};
