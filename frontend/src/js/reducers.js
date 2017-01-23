import { combineReducers } from 'redux';
import user from './reducers/userReducer';
import talents from './reducers/talentsReducer';
export default combineReducers({
  user,
  talents
});

