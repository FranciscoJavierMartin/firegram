import { combineReducers } from 'redux';
import { IGlobalState } from '../interfaces/states';
import userReducer from './user/userReducer';

const rootReducer = combineReducers<IGlobalState>({
  user: userReducer,
});

export default rootReducer;