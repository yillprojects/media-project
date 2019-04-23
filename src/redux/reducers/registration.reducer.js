import { authenticationConstants } from "../constants/authentication.constants";

export const registration = (state = {}, action) => {
  switch (action.type) {
    case authenticationConstants.REGISTER_REQUEST:
      console.log("registering");
      return { registering: true };
    case authenticationConstants.REGISTER_SUCCESS:
      return {};
    case authenticationConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};
