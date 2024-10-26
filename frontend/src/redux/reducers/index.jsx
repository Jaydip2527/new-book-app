import { combineReducers } from 'redux';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
  items: bookReducer,
  // add other reducers here
});

export default rootReducer;
