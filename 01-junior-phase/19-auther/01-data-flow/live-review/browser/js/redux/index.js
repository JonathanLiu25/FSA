import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import currentUser from './current-user';

export default combineReducers({
  users,
  stories,
  currentUser
});
