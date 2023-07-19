import { combineReducers } from 'redux';
import auth from '../app/auth/auth.reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
