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
import {AppActions, AppDispatch} from "../store";
import {UserAction} from "../reducers/userReducer";


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
        dispatch(userRequest() as unknown as UserAction);
        userRegister(data).then(res => {
            dispatch(userRegisterSuccess(res) as unknown as UserAction);
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
        }).catch(() => dispatch(userRegisterError() as unknown as UserAction));
    }
}

export const userLoginThunk = (data: Login) => (dispatch: AppDispatch) => {
    if (data) {
        dispatch(userRequest() as unknown as UserAction);
        userLogin(data).then(res => {
            dispatch(userLoginSuccess(res) as unknown as UserAction);
            setCookie('accessToken', res.accessToken);
            setCookie('refreshToken', res.refreshToken);
        }).catch((e) => {
            if (e.message === 'jwt expired') {
                return refreshToken()
                    .then((data) => {
                        setCookie('accessToken', data.accessToken);
                        setCookie('refreshToken', data.refreshToken);
                        dispatch(refreshTokenSuccess() as unknown as UserAction);
                    })
                    .then(() => {
                        userLogin(data)
                            .then((data) => dispatch(userLoginSuccess(data) as unknown as UserAction))
                            .catch(() => {
                                dispatch(userLoginError() as unknown as UserAction)
                                dispatch(refreshTokenError() as unknown as UserAction);
                            });
                    })
                    .catch(() => dispatch(refreshTokenError() as unknown as UserAction));
            } else {
                dispatch(userLoginError() as unknown as UserAction)
            }
        });
    }
}

export const userProfileThunk = () => (dispatch: AppDispatch) => {
    dispatch(userRequest() as unknown as UserAction);
    userProfile().then(res => {
        dispatch(userProfileSuccess(res) as unknown as UserAction);
    }).catch((e) => {
        if (e.message === 'jwt expired') {
            return refreshToken()
                .then((data) => {
                    setCookie('accessToken', data.accessToken);
                    setCookie('refreshToken', data.refreshToken);
                    dispatch(refreshTokenSuccess() as unknown as UserAction);
                })
                .then(() => {
                    userProfile()
                        .then((data) => dispatch(userProfileSuccess(data) as unknown as UserAction))
                        .catch(() => {
                            dispatch(userProfileError() as unknown as UserAction)
                            dispatch(refreshTokenError() as unknown as UserAction);
                        });
                })
                .catch(() => dispatch(refreshTokenError() as unknown as UserAction));
        } else {
            dispatch(userProfileError() as unknown as UserAction)
        }
    });
}

export const resetUserPassword = (email: string) => (dispatch: AppDispatch) => {
    dispatch(userRequest() as unknown as UserAction);
    resetPassword(email).then(() => {
        dispatch(resetPassSuccess() as unknown as UserAction);
    }).catch(() => dispatch(resetPassError() as unknown as UserAction));
};

export const resetPassWithCode = (pass: string, code: string) => (dispatch: AppDispatch) => {
    dispatch(userRequest() as unknown as UserAction);
    resetPasswordWithCode(pass, code).then(() => {
        dispatch(resetPassWithCodeSuccess() as unknown as UserAction);
    }).catch(() => dispatch(resetPassWithCodeError() as unknown as UserAction));
};

export const logoutUser = (cb: () => void
) =>
    (dispatch: AppDispatch) => {
        dispatch(userRequest() as unknown as UserAction);
        logout().then((res) => {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            dispatch(loguotUserSuccess() as unknown as UserAction);
        }).then(() => cb()).catch(() => dispatch(loguotUserError() as unknown as UserAction));
    };

export const updateUserProfile = (name: string, email: string) => (dispatch: AppDispatch) => {
    dispatch(userRequest() as unknown as UserAction);
    updateProfile(name, email).then((data) => {
        dispatch(updateProfileSuccess(data) as unknown as UserAction);
    })
        .catch((e) => {
            if (e.message === 'jwt expired') {
                return refreshToken()
                    .then((data) => {
                        setCookie('accessToken', data.accessToken);
                        setCookie('refreshToken', data.refreshToken);
                        dispatch(refreshTokenSuccess() as unknown as UserAction);
                    })
                    .then(() => {
                        updateProfile(name, email)
                            .then((data) =>
                                dispatch(updateProfileSuccess(data) as unknown as UserAction)
                            )
                            .catch(() => {
                                dispatch(updateProfileError() as unknown as UserAction);
                                dispatch(refreshTokenError() as unknown as UserAction);
                            });
                    });
            } else {
                dispatch(updateProfileError() as unknown as UserAction);
            }
        });
};