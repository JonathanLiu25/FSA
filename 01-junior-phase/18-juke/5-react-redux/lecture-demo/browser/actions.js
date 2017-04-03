import axios from 'axios';

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_COLOR = 'CHANGE_COLOR';
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';

export function changeColor (color) {
  return {
    type: CHANGE_COLOR,
    newColor: color
  };
}

export function changeTitle (title) {
  return {
    type: CHANGE_TITLE,
    newTitle: title
  };
}

export function changeText (text) {
  return {
    type: CHANGE_TEXT,
    newText: text
  };
}

export function retrieveEntries () {
  return function (dispatch) {
    axios.get('/api/diary')
    .then(response => {
      return response.data;
    })
    .then(data => {
      dispatch({
        type: RECEIVE_ENTRIES,
        entries: data
      });
    });
  };
}
