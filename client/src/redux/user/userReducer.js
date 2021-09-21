import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_VERIFICATION_REQUEST,
    USER_VERIFICATION_SUCCESS,
    USER_VERIFICATION_FAILURE,   
    USER_LOGOUT,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE
} from './userTypes.js';

export const userAuthReducer = (state={}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST : 
        case USER_REGISTER_REQUEST : 
        case USER_VERIFICATION_REQUEST :
            return {
                ...state,
                isLoading : true
            };
        case USER_LOGIN_SUCCESS :
            return {
                ...state,
                isLoading : false, 
                isAuthenticated : true,
                userInfo : action.payload
            };
        
        case USER_REGISTER_SUCCESS :  
            return {
                ...state,
                isLoading : false
            }
        case USER_VERIFICATION_SUCCESS :
            return {
                ...state,
                isLoading : false,
                isVerified : true 
            }
        case USER_LOGIN_FAILURE : 
        case USER_REGISTER_FAILURE :
            return {
                ...state,
                userInfo : null,
                isLoading : false,
                isAuthenticated : false
            }
        case USER_VERIFICATION_FAILURE :
            return {
                ...state,
                userInfo : null,
                isLoading : false,
                isVerified : false
            }
        case USER_LOGOUT :
            return {
                userInfo : null
            };
        default :
            return state;
    }
}

export const userDetailsReducer = (state={}, action) => {
    switch(action.type){
        case GET_USER_DETAILS_REQUEST :
            return {
                ...state,
                isLoading : true
            }
        case GET_USER_DETAILS_SUCCESS :
            return {
                ...state,
                isLoading : false,
                details : action.payload
            }
        case GET_USER_DETAILS_FAILURE : 
            return {
                ...state,
                isLoading : false,
                details : null
            }
        default : 
            return state;
    }
}


export const getUsersReducer = (state={}, action) => {
    switch(action.type){
        case GET_USERS_REQUEST :
            return {
                ...state,
                isLoading : true
            }
        case GET_USERS_SUCCESS :
            return {
                ...state,
                isLoading : false,
                usersList : action.payload
            }
        case GET_USERS_FAILURE : 
            return {
                ...state,
                isLoading : false,
                usersList : null
            }
        default : 
            return state;
    }
}
