import {
    USER_REQUEST,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_ERROR,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_WITH_CODE_FAILED,
    PASSWORD_RESET_WITH_CODE_SUCCESS,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED
} from "../types/userTypes";
import {
    userRegister,
    userLogin,
    userProfile,
    refreshToken,
    resetPassword,
    resetPasswordWithCode,
    logout,
    updateProfile
} from "../../../utils/burger-api";
import {deleteCookie, setCookie} from '../../../utils/cookie'

const userRegisterSuccess = (data) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: data,
    };
};

const userLoginSuccess = (data) => {
  return {
      type: LOGIN_USER_SUCCESS,
      payload: data,
  };
};

const userProfileSuccess = (data) => {
  return {
      type: USER_PROFILE_SUCCESS,
      payload: data,
  };
};

const updateProfileSuccess = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
    };
};

const refreshTokenSuccess = () => {
  return {
      type: REFRESH_TOKEN_SUCCESS,
  };
};

const resetPassSuccess = () => {
    return {
        type: PASSWORD_RESET_SUCCESS,
    };
};

const resetPassWithCodeSuccess = () => {
    return {
        type: PASSWORD_RESET_WITH_CODE_SUCCESS,
    };
};

const loguotUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
    };
};

const userRequest = () => {
    return {
        type: USER_REQUEST,
    };
};

const userRegisterError = () => {
    return {
        type: REGISTER_USER_ERROR,
    };
};

const userLoginError = () => {
  return {
      type: LOGIN_USER_ERROR,
  };
};

const userProfileError = () => {
  return {
      type: USER_PROFILE_ERROR,
  };
};

const updateProfileError = () => {
    return {
        type: UPDATE_PROFILE_FAILED,
    };
};

const refreshTokenError = () => {
  return {
      type: REFRESH_TOKEN_FAILED,
  };
};

const resetPassError = () => {
    return {
        type: PASSWORD_RESET_FAILED,
    };
};

const resetPassWithCodeError = () => {
    return {
        type: PASSWORD_RESET_WITH_CODE_FAILED,
    };
};

const loguotUserError = () => {
    return {
        type: LOGOUT_USER_FAILED,
    };
};

export const userRegisterThunk = (data) => (dispatch) => {
    if (data) {
        dispatch(userRequest());
        userRegister(data).then(res => {
            dispatch(userRegisterSuccess(res));
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
        }).catch(() => dispatch(userRegisterError()));
    }
}

export const userLoginThunk = (data) => (dispatch) => {
    if (data) {
        dispatch(userRequest());
        userLogin(data).then(res => {
            dispatch(userLoginSuccess(res));
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
        }).catch((e) => {
            if (e.message === 'jwt expired') {
                return refreshToken()
                    .then((data) => {
                        setCookie('accessToken', data.accessToken);
                        setCookie('refreshToken', data.refreshToken);
                        dispatch(refreshTokenSuccess());
                    })
                    .then(() => {
                        userLogin()
                            .then((data) => dispatch(userLoginSuccess(data)))
                            .catch(() => {
                                dispatch(userLoginError())
                                dispatch(refreshTokenError());
                            });
                    })
                    .catch(() => dispatch(refreshTokenError()));
            } else {
                dispatch(userProfileError())
            }
        });
    }
}

export const userProfileThunk = () => (dispatch) => {
    dispatch(userRequest());
    userProfile().then(res => {
        dispatch(userProfileSuccess(res));
    }).catch((e) => {
      if (e.message === 'jwt expired') {
        return refreshToken()
          .then((data) => {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            dispatch(refreshTokenSuccess());
          })
          .then(() => {
            userProfile()
              .then((data) => dispatch(userProfileSuccess(data)))
              .catch(() => {
                dispatch(userProfileError())
                dispatch(refreshTokenError());
              });
          })
          .catch(() => dispatch(refreshTokenError()));
      } else {
        dispatch(userProfileError())
      }
      });
}

export const resetUserPassword = (email) => (dispatch) => {
    dispatch(userRequest());
    resetPassword(email).then((res) => {
        dispatch(resetPassSuccess());
    }).catch(() => dispatch(resetPassError()));
};

export const resetPassWithCode = (pass, code) => (dispatch) => {
    dispatch(userRequest());
    resetPasswordWithCode(pass, code).then((res) => {
        dispatch(resetPassWithCodeSuccess());
    }).catch(() => dispatch(resetPassWithCodeError()));
};

export const logoutUser = () => (dispatch) => {
    dispatch(userRequest());
    logout().then((res) => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(loguotUserSuccess());
    }).catch(() => dispatch(loguotUserError()));
};

export const updateUserProfile = (name, email) => (dispatch) => {
        dispatch(userRequest());
        updateProfile(name, email).then((data) => {
                dispatch(updateProfileSuccess(data));
            })
            .catch((e) => {
                if (e.message === 'jwt expired') {
                    return refreshToken()
                        .then((data) => {
                            setCookie('accessToken', data.accessToken);
                            setCookie('refreshToken', data.refreshToken);
                            dispatch(refreshTokenSuccess());
                        })
                        .then(() => {
                            updateProfile(name, email)
                                .then((data) =>
                                    dispatch(updateProfileSuccess(data))
                                )
                                .catch(() => {
                                    dispatch(updateProfileError());
                                    dispatch(refreshTokenError());
                                });
                        });
                } else {
                    dispatch(updateProfileError());
                }
            });
    };