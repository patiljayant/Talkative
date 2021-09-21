import {
    ADD_ERROR,
    CLEAR_ERROR
} from './errorTypes.js';

export const errorReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_ERROR :
            return {
                ...state,
                message : action.payload
            }

        case CLEAR_ERROR :
            return{
                ...state,
                message : null
            }
        default :
            return state
    }
}