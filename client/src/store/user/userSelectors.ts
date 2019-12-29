import { createSelector } from 'reselect';
import { FirebaseUser } from './../../interfaces/types';
import { IUserState, IGlobalState } from '../../interfaces/states';

const selectUser = (state: IGlobalState): IUserState => state.user;

export const selectCurrentUser = createSelector<
  IGlobalState,
  IUserState,
  FirebaseUser
>([selectUser], user => user.currentUser);
