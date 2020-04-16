import { FirebaseUser } from "./types";

export interface IGlobalState {
  user: IUserState;
}

export interface IUserState{
  currentUser: FirebaseUser;
}