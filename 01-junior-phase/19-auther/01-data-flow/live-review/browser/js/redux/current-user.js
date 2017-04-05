import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const CREATE_CURRENT_USER = 'CREATE_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

const unsetCurrentUser = () => ({
  type: SET_CURRENT_USER,
  user: null
});

/* ------------       REDUCERS     ------------------ */

export default function reducer (currentUser = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const login = (credentials) => (dispatch) => {
  return axios.post('/api/login', credentials)
  .then(response => {
    const action = setCurrentUser(response.data);
    dispatch(action);
  });
};

export const signup = (credentials) => (dispatch) => {
  return axios.post('/api/signup', credentials)
  .then(response => {
    const action = setCurrentUser(response.data);
    dispatch(action);
  });
};

export const logout = () => (dispatch) => {
  return axios.get('/api/logout')
  .then(response => {
    dispatch(unsetCurrentUser());
  });
};

export const fetchCurrentUser = () => (dispatch) => {
  return axios.get('/api/current-user')
  .then(response => {
    const action = setCurrentUser(response.data);
    dispatch(action);
  });
};

