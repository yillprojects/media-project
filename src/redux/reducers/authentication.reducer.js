import { authenticationConstants } from '../constants/authentication.constants';

export const authentication = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.payload
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {};
    case authenticationConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
