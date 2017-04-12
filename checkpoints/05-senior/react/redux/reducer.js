import { combineReducers } from 'redux';

import { MESSAGES_RECEIVED, MESSAGES_LOADING, NEW_MESSAGE } from './constants';

function messagesLoadingReducer (state = false, action) {
  switch (action.type) {
    case MESSAGES_LOADING:
      return true;
    // there's no "DONE_LOADING" action type, "MESSAGES_RECEIVED" covers this case
    case MESSAGES_RECEIVED:
      return false;
    default:
      return state;
  }
}

function messagesReducer (state = [], action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return action.messages;
    case NEW_MESSAGE:
      return state.concat(action.message);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  messagesLoading: messagesLoadingReducer,
  messages: messagesReducer
});

export default rootReducer;
