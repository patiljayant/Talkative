import {
    GET_CONVERSATION_REQUEST,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_FAILURE,
    SET_CONVERSATION,
    ADD_MESSAGE_REQUEST,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_FAILURE
} from './chatTypes.js';
import axios from 'axios';
import {addError} from '../error/errorActions'

export const getConversation = (token) => {
    
    return (dispatch) => {
        dispatch(getConversationRequest());
        const config = constructHeader(token);
        // const method = data.receiverId ? "POST" : "GET";
        // axios({
        //     method : method,
        //     url :'/api/user/chat-routes', 
        //     headers : config.headers,
        //     recieverId : data.receiverId
        // })
        axios.get('/api/user/chat-routes', config)
             .then((res) => {
                dispatch(getConversationSuccess(res.data));
             })
             .catch((err)=>{
                dispatch(addError(err.response.data.message));
                dispatch(getConversationFailure());
             })
    }
}

export const postConversation = (data) => {
    return (dispatch) => {
        dispatch(getConversationRequest());
        const config = constructHeader(data.token);
        axios.post('/api/user/chat-routes', config, data.info)
             .then((res) => {
                dispatch(getConversationSuccess(res.data));
             })
             .catch((err)=>{
                dispatch(addError(err.response.data.message));
                dispatch(getConversationFailure());
             })
    }
} 

export const setCurrentConversation = (conversation) => {
    return (dispatch) => {
        dispatch(setConversation(conversation));
    }
}

export const addMessage = (data) => {
    return (dispatch) => {
        dispatch(addMessageRequest());
        const config = constructHeader(data.token);
        axios.post('/api/user/chat-routes/add-message',data.messageInfo,config)
        .then((res)=>{
            dispatch(addMessageSuccess(res.data));
        })
        .catch((err) => {
            dispatch(addError(err.response.data.message));
            dispatch(addMessageFailure());
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

const getConversationRequest = () => {
    return {
        type : GET_CONVERSATION_REQUEST
    }
}

const getConversationSuccess = (data) => {
    return {
        type : GET_CONVERSATION_SUCCESS,
        payload : data
    }
}

const getConversationFailure = () => {
    return {
        type : GET_CONVERSATION_FAILURE
    }
}

const setConversation = (data) => {
    return {
        type : SET_CONVERSATION,
        payload : data
    }
}

const addMessageRequest = () => {
    return {
        type : ADD_MESSAGE_REQUEST
    }
}

const addMessageSuccess = (data) => {
    return {
        type : ADD_MESSAGE_SUCCESS,
        payload : data
    }
}

const addMessageFailure = () => {
    return {
        type : ADD_MESSAGE_FAILURE
    }
}