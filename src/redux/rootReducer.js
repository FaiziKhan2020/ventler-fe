import { combineReducers } from 'redux';
import data from '../app/data/data.reducers';
import auth from '../app/auth/auth.reducer';

const rootReducer = combineReducers({
  data,
  auth,
});

export default rootReducer;
