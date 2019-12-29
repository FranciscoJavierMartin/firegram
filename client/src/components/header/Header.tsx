import React from 'react';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../../interfaces/states';
import { FirebaseUser } from '../../interfaces/types';
import { auth } from '../../firebase/firebase.utils';

const Header: React.FC = () => {
  const currentUser = useSelector<IGlobalState, FirebaseUser>(
    (state: IGlobalState) => state.user.currentUser
  );

  return (
    <header>
      <span>User {currentUser?.displayName}</span>
      <ul>
        <li>Home</li>
        <li>Log In</li>
        <li>Sign Up</li>
        <li>
          <button onClick={() => {
            auth.signOut();
          }}>
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
