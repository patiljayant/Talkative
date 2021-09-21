import {
    GET_CONVERSATION_REQUEST,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_FAILURE,
    SET_CONVERSATION,
    ADD_MESSAGE_REQUEST,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_FAILURE
} from './chatTypes.js';

export const userChatReducer = (state={}, action) => {
    switch(action.type){
        case GET_CONVERSATION_REQUEST : 
        case ADD_MESSAGE_REQUEST :
            return {
                ...state,
                isLoading : true
            }
        case GET_CONVERSATION_SUCCESS :
            return {
                ...state,
                isLoading : false,
                conversation : action.payload
            }
        case GET_CONVERSATION_FAILURE : 
        case ADD_MESSAGE_FAILURE :
            return {
                ...state,
                isLoading : false,
            }
        case SET_CONVERSATION : 
        case ADD_MESSAGE_SUCCESS : 
            return {
                ...state,
                currentConversation : action.payload
            }
        default :
            return state;
    }
}