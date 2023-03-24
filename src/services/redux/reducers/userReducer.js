import {
  USER_REQUEST,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  USER_PROFILE_ERROR,
  USER_PROFILE_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_WITH_CODE_FAILED,
  PASSWORD_RESET_WITH_CODE_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED
} from "../types/userTypes";

export const userState = {
  isAuthorized: false,
  user: {
    email: "",
    name: "",
  },
  requestIsSent: false,
  responseError: false,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, requestIsSent: true };

    case UPDATE_PROFILE_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case USER_PROFILE_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case REFRESH_TOKEN_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_WITH_CODE_SUCCESS:
      const data = action.payload;
      return {
        ...state,
        user: { email: data.user.email, name: data.user.name },
        isAuthorized: true,
        requestIsSent: false,
        responseError: false,
      };

    case UPDATE_PROFILE_FAILED:
    case REFRESH_TOKEN_FAILED:
    case LOGOUT_USER_FAILED:
    case REGISTER_USER_ERROR:
    case PASSWORD_RESET_FAILED:
    case PASSWORD_RESET_WITH_CODE_FAILED:
    case USER_PROFILE_ERROR:
    case LOGIN_USER_ERROR:
      return { ...state, requestIsSent: false, responseError: true };

    case LOGOUT_USER_SUCCESS:
      return {...userState}

    default:
      return state;
  }
};

export default userReducer;
