import { UserActionTypes } from "../store/user/userActionTypes";

export type FirebaseUser = firebase.User | null;

// TODO: Create an action for each type of reducer
export interface IUserAction {
  type: UserActionTypes;
  payload?: any;
}