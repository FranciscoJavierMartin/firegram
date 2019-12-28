import { FirebaseUser, IUserAction } from "../../interfaces/types";
import { UserActionTypes } from './userActionTypes';

export const setCurrentUser = (user: FirebaseUser): IUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logout = (): IUserAction => ({
  type: UserActionTypes.LOGOUT_USER
});