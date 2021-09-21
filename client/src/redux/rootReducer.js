import { combineReducers } from 'redux';
import { userChatReducer } from './chat/chatReducers.js';
import { errorReducer } from './error/errorReducers.js';
import { getUsersReducer, userAuthReducer, userDetailsReducer} from './user/userReducer.js';

const rootReducer = combineReducers({
    user : userAuthReducer,
    userDetails : userDetailsReducer,
    messages : errorReducer,
    conversation : userChatReducer,
    users : getUsersReducer
  })
  
  export default rootReducer;