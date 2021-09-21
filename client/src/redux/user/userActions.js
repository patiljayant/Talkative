import axios from 'axios';
import { addError } from '../error/errorActions.js';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAILURE,
    USER_VERIFICATION_REQUEST,
    USER_VERIFICATION_SUCCESS,
    USER_VERIFICATION_FAILURE,
    USER_LOGOUT,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE
} from './userTypes.js';

export const userLogin = (userInfo) => {
    return (dispatch) => {
        dispatch(userLoginRequest());
        axios
            .post('/api/user/auth-routes/login', userInfo)
            .then((res => {
                localStorage.setItem('userInfo',JSON.stringify(res.data));
                dispatch(userLoginSuccess(res.data));
            }))
            .catch((err) => {
                dispatch(addError(err.response.data.message));
                dispatch(userLoginFailure());
            });
    }
}

export const userRegister = (userInfo) => {
    return (dispatch) => {
        dispatch(userRegisterRequest());
        axios
            .post('/api/user/auth-routes/signup', userInfo)
            .then(res => { 
                dispatch(addError(res.data.message));
                dispatch(userRegisterSuccess());
            })
            .catch((err) => {
                dispatch(addError(err.response.data.message));
                dispatch(userRegisterFailure());
            });
    }
}

export const userVerification = (verificationInfo) => {
    return (dispatch) => {
        dispatch(userVerificationRequest());
        axios
            .put('/api/user/auth-routes/verify-user', verificationInfo)
            .then((res) => {
                dispatch(addError(res.data.message));
                dispatch(userVerificationSuccess());
            }) 
            .catch(err => {
                dispatch(addError(err.response.data.message));
                dispatch(userVerificationFailure())
            })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        localStorage.setItem("userInfo", null);
        dispatch(logout());
    }
}

export const getUserDetails = (data) => {
    return (dispatch) => {
        dispatch(getUserDetailsRequest());
        const config = constructHeader(data.token);
        axios.get('/api/user/user-routes/user/'+data.id,config)
        .then(res => {
            dispatch(getUserDetailsSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUserDetailsFailure());
        })
    }
}

export const getUsers = (token) => {
    return (dispatch) => {
        dispatch(getUsersRequest());
        const config = constructHeader(token);
        axios.get('/api/user/user-routes/get-users',config)
        .then(res => {
            dispatch(getUsersSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUsersFailure());
        })
    }
}

export const addConnectionRequest = (data) => {
    return (dispatch) => {
        dispatch(getUsersRequest());
        const config = constructHeader(data.token);
        axios.post('/api/user/user-routes/connection-request/add',{id : data.id}, config )
        .then(res => {
            dispatch(getUsersSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUsersFailure());
        })
    }
}

export const revokeConnectionRequest = (data) => {
    return (dispatch) => {
        dispatch(getUsersRequest());
        const config = constructHeader(data.token);
        axios.delete('/api/user/user-routes/connection-request/revoke',{id : data.id}, config )
        .then(res => {
            dispatch(getUsersSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUsersFailure());
        })
    }
}

export const endConnection = (data) => {
    return (dispatch) => {
        dispatch(getUsersRequest());
        const config = constructHeader(data.token);
        axios.delete('/api/user/user-routes/connection-request/end',{id : data.id}, config )
        .then(res => {
            dispatch(getUsersSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUsersFailure());
        })
    }
}

export const acceptConnectionRequest = (data) => {
    return (dispatch) => {
        dispatch(getUserDetailsRequest());
        const config = constructHeader(data.token);
        axios.put('/api/user/user-routes/connection-request/accept',{id : data.id}, config )
        .then(res => {
            dispatch(getUserDetailsSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUserDetailsFailure());
        })
    }
}

export const rejectConnectionRequest = (data) => {
    return (dispatch) => {
        dispatch(getUserDetailsRequest());
        const config = constructHeader(data.token);
        axios.delete('/api/user/user-routes/connection-request/reject',{id : data.id}, config )
        .then(res => {
            dispatch(getUserDetailsSuccess(res.data));
        })
        .catch(err => {
            dispatch(addError(err.response.data.message));
            dispatch(getUserDetailsFailure());
        })
    }
}

const constructHeader = (token) => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
    }
}

export const userLoginRequest = () => {
    return {
        type : USER_LOGIN_REQUEST
    }
}

export const userLoginSuccess = (token) => {
    return {
        type : USER_LOGIN_SUCCESS,
        payload : token
    }
}

export const userLoginFailure = () => {
    return {
        type : USER_LOGIN_FAILURE
    }
}

export const getUserDetailsRequest = () => {
    return {
        type : GET_USER_DETAILS_REQUEST
    }
}

export const getUserDetailsSuccess = (user) => {
    return {
        type : GET_USER_DETAILS_SUCCESS,
        payload : user
    }
}

export const getUserDetailsFailure = () => {
    return {
        type : GET_USER_DETAILS_FAILURE
    }
}


export const userRegisterRequest = () => {
    return {
        type : USER_REGISTER_REQUEST
    }
}

export const userRegisterSuccess = () => {
    return {
        type : USER_REGISTER_SUCCESS
    }
}

export const userRegisterFailure = () => {
    return {
        type : USER_REGISTER_FAILURE
    }
}


export const userVerificationRequest = () => {
    return {
        type : USER_VERIFICATION_REQUEST
    }
}

export const userVerificationSuccess = () => {
    return {
        type : USER_VERIFICATION_SUCCESS
    }
}

export const userVerificationFailure = () => {
    return {
        type : USER_VERIFICATION_FAILURE
    }
}

export const getUsersRequest = () => {
    return {
        type : GET_USERS_REQUEST
    }
}

export const getUsersSuccess = (user) => {
    return {
        type : GET_USERS_SUCCESS,
        payload : user
    }
}

export const getUsersFailure = () => {
    return {
        type : GET_USERS_FAILURE
    }
}

export const logout = () => {
    return {
        type : USER_LOGOUT
    }
}