import { IUserState } from "../../interfaces/states";
import { IUserAction } from "../../interfaces/types";
import { UserActionTypes } from "./userActionTypes";
import { auth } from "../../firebase/firebase.utils";

const initialState: IUserState = {
  currentUser: null,
};

export default (state: IUserState = initialState, action: IUserAction) => {
  let newState: IUserState;

  switch(action.type){
    case UserActionTypes.SET_CURRENT_USER:
      newState = {
        ...state,
        currentUser: action.payload,
      }
      break;
    case UserActionTypes.LOGOUT_USER:
      auth.signOut();
      newState = {
        ...state,
        currentUser: null,
      }
      break;
    default:
      newState = state;
  }

  return newState;
}