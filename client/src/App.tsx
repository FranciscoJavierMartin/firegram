/* eslint-disable */
// TODO: Remove the previous line
import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/header/Header';
import LoginPage from './pages/login/LoginPage';
import { auth } from './firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import * as userActions from './store/user/userActions';
import SignUpPage from './pages/signup/SignUpPage';
import { Switch, Route } from 'react-router-dom';
import CameraPage from './pages/camera/CameraPage';
import HomePage from './pages/home/HomePage';

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
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/camera' component={CameraPage}/>
        <Route exact path='/' component={HomePage}/>
      <LoginPage/>
      </Switch>
    </div>
  );
}

export default App;
