import { UserActionTypes } from './userActionTypes';
import { IUserState } from '../../interfaces/states';
import { IUserAction } from '../../interfaces/types';

const INITIAL_STATE: IUserState = {
  currentUser: null
};

const userReducer = (state: IUserState = INITIAL_STATE, action: IUserAction) => {
  let newState: IUserState;

  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      newState = {
        ...state,
        currentUser: action.payload
      };
      break;
    default:
      newState = state;
  }

  return newState;
};

export default userReducer;