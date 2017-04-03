import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  CHANGE_TITLE,
  CHANGE_COLOR,
  CHANGE_TEXT,
  RECEIVE_ENTRIES
} from './actions';

const initialState = {
  inputTitle: '',
  inputColor: '',
  inputEntryText: '',
  allEntries: []
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return Object.assign({}, state, {
        inputTitle: action.newTitle
      });
    case CHANGE_COLOR:
      return Object.assign({}, state, {
        inputColor: action.newColor
      });
    case CHANGE_TEXT:
      return Object.assign({}, state, {
        inputEntryText: action.newText
      });
    case RECEIVE_ENTRIES:
      return Object.assign({}, state, {
        allEntries: action.entries
      });
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
