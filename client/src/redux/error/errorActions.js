import { userLogout } from '../user/userActions.js';
import {
    ADD_ERROR,
    CLEAR_ERROR
} from './errorTypes.js';

export const addError = (msg) => {
    return (dispatch) => {
        if(msg === "jwt expired")
            dispatch(userLogout());

        dispatch({
            type : ADD_ERROR,
            payload : msg
        })
    }
}

export const clearError = () => {
    return (dispatch) => {
        dispatch({
            type :CLEAR_ERROR
        })
    }
}