import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IGlobalState } from '../../interfaces/states';
import { FirebaseUser } from '../../interfaces/types';
import * as userActions from '../../store/user/userActions';

const Header: React.FC = () => {
  const currentUser = useSelector<IGlobalState, FirebaseUser>(
    (state: IGlobalState) => state.user.currentUser
  );
  const dispatch = useDispatch();

  return (
    <header>
      <ul>
        <li>Home</li>
        <li>Log In</li>
        <li>Sign Up</li>
        {currentUser && (
          <li>
            <button
              onClick={() => {
                dispatch(userActions.logout());
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
