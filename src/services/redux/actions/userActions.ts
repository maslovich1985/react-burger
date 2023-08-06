import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_WITH_CODE_FAILED,
    PASSWORD_RESET_WITH_CODE_SUCCESS,
    REFRESH_TOKEN_FAILED,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_SUCCESS,
    USER_PROFILE_ERROR,
    USER_PROFILE_SUCCESS,
    USER_REQUEST
} from "../types/userTypes";
import {
    Login,
    logout,
    refreshToken,
    Register,
    resetPassword,
    resetPasswordWithCode,
    updateProfile,
    userLogin,
    userProfile,
    userRegister
} from "../../../utils/burger-api";
import {deleteCookie, setCookie} from '../../../utils/cookie'
import {AppActions} from "../store";
import {AppDispatch} from "../hooks";


interface Profile {
    name: string;
    email: string;
}

const userRegisterSuccess = (data: Register): AppActions => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: data,
    };
};

const userLoginSuccess = (data: Login): AppActions => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data,
    };
};

const userProfileSuccess = (data: Profile): AppActions => {
    return {
        type: USER_PROFILE_SUCCESS,
        payload: data,
    };
};

const updateProfileSuccess = (data: Profile): AppActions => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
    };
};

const refreshTokenSuccess = (): AppActions => {
    return {
        type: REFRESH_TOKEN_SUCCESS,
    };
};

const resetPassSuccess = (): AppActions => {
    return {
        type: PASSWORD_RESET_SUCCESS,
    };
};

const resetPassWithCodeSuccess = (): AppActions => {
    return {
        type: PASSWORD_RESET_WITH_CODE_SUCCESS,
    };
};

const loguotUserSuccess = (): AppActions => {
    return {
        type: LOGOUT_USER_SUCCESS,
    };
};

const userRequest = (): AppActions => {
    return {
        type: USER_REQUEST,
    };
};

const userRegisterError = (): AppActions => {
    return {
        type: REGISTER_USER_ERROR,
    };
};

const userLoginError = (): AppActions => {
    return {
        type: LOGIN_USER_ERROR,
    };
};

const userProfileError = (): AppActions => {
    return {
        type: USER_PROFILE_ERROR,
    };
};

const updateProfileError = (): AppActions => {
    return {
        type: UPDATE_PROFILE_FAILED,
    };
};

const refreshTokenError = (): AppActions => {
    return {
        type: REFRESH_TOKEN_FAILED,
    };
};

const resetPassError = (): AppActions => {
    return {
        type: PASSWORD_RESET_FAILED,
    };
};

const resetPassWithCodeError = (): AppActions => {
    return {
        type: PASSWORD_RESET_WITH_CODE_FAILED,
    };
};

const loguotUserError = (): AppActions => {
    return {
        type: LOGOUT_USER_FAILED,
    };
};

export const userRegisterThunk = (data: Register) => (dispatch: AppDispatch) => {
    if (data) {
        dispatch(userRequest());
        userRegister(data).then(res => {
            dispatch(userRegisterSuccess(res));
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
        }).catch(() => dispatch(userRegisterError()));
    }
}

export const userLoginThunk = (data: Login) => (dispatch: AppDispatch) => {
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
                        userLogin(data)
                            .then((data) => dispatch(userLoginSuccess(data)))
                            .catch(() => {
                                dispatch(userLoginError())
                                dispatch(refreshTokenError());
                            });
                    })
                    .catch(() => dispatch(refreshTokenError()));
            } else {
                dispatch(userLoginError())
            }
        });
    }
}

export const userProfileThunk = () => (dispatch: AppDispatch) => {
    dispatch(userRequest());
    return userProfile().then(res => {
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

export const resetUserPassword = (email: string) => (dispatch: AppDispatch) => {
    dispatch(userRequest());
    resetPassword(email).then(() => {
        dispatch(resetPassSuccess());
    }).catch(() => dispatch(resetPassError()));
};

export const resetPassWithCode = (pass: string, code: string) => (dispatch: AppDispatch) => {
    dispatch(userRequest());
    resetPasswordWithCode(pass, code).then(() => {
        dispatch(resetPassWithCodeSuccess());
    }).catch(() => dispatch(resetPassWithCodeError()));
};

export const logoutUser = (cb: () => void
) =>
    (dispatch: AppDispatch) => {
        dispatch(userRequest());
        return logout().then((res) => {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            dispatch(loguotUserSuccess());
        }).then(() => cb()).catch(() => dispatch(loguotUserError()));
    };

export const updateUserProfile = (name: string, email: string) => (dispatch: AppDispatch) => {
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