import axios from "axios";

import { authenticationConstants } from "../constants/authentication.constants";
import { alertActions } from "./alert.actions";

function register(user) {
  return dispatch => {
    dispatch(request(user));

    axios
      .post("http://localhost:8000/api/users/register/", {
        ...user
      })
      .then(user => {
        dispatch(success());
        dispatch(alertActions.success("Registration successful"));
        console.log(user);
      })
      .catch(err => {
        dispatch(failure(err));
        dispatch(alertActions.error("There was an error"));
        console.log(err);
      });
  };

  function request(user) {
    return {
      type: authenticationConstants.REGISTER_REQUEST,
      user
    };
  }
  function success(user) {
    return { type: authenticationConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: authenticationConstants.REGISTER_FAILURE, error };
  }
}

export const authenticationActions = {
  register
};
