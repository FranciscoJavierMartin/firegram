/* eslint-disable */
// TODO: Remove the previous line
import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/header/Header';
import LoginPage from './pages/login/LoginPage';
import { auth } from './firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import * as userActions from './store/user/userActions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  let unsubscribeFromAuth: any = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('State change');
      if(userAuth){
        dispatch(userActions.setCurrentUser(userAuth));
      }
    })

    return () => {
      console.log('Unsubscribe');
      if(unsubscribeFromAuth){
        
        unsubscribeFromAuth();
      }
    }
  });

  return (
    <div className="App" data-test='component-app'>
      <Header/>
      <LoginPage/>
    </div>
  );
}

export default App;
