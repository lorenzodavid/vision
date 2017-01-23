import talentsReducer from './talentsReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
  user: userReducer,
  talents: talentsReducer
});
