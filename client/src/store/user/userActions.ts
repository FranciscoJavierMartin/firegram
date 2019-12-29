import { UserActionTypes } from './userActionTypes';
import { FirebaseUser, IUserAction } from '../../interfaces/types';

export const setCurrentUser = (user: FirebaseUser): IUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});