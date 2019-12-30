/* eslint-disable */
// TODO: Remove the previous line
import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/header/Header';
import LoginPage from './pages/login/LoginPage';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from './store/user/userActions';
import SignUpPage from './pages/signup/SignUpPage';
import { Switch, Route } from 'react-router-dom';
import CameraPage from './pages/camera/CameraPage';
import HomePage from './pages/home/HomePage';
import { IGlobalState } from './interfaces/states';
import { FirebaseUser } from './interfaces/types';
import { selectCurrentUser } from './store/user/userSelectors';

const ProtectedRoute: React.FC = () => <h1>Hello protected</h1>
const NonProtectedRoute: React.FC = () => <h1>Hello non protected</h1>


const App: React.FC = () => {
  const dispatch = useDispatch();
  let unsubscribeFromAuth: any = null;
  const currentUser = useSelector<IGlobalState, FirebaseUser>(selectCurrentUser);
  
  useEffect(() => {

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth: FirebaseUser) => {
      console.log('State change', userAuth);

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot: firebase.firestore.DocumentSnapshot) => {

         console.log('Snapshot',snapshot.id);
        })
      }
      dispatch(userActions.setCurrentUser(userAuth));
    })

    return () => {
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
        <Route path='/protected' render={() => currentUser ? (<ProtectedRoute/>) : (<NonProtectedRoute/>)}/>
      </Switch>
    </div>
  );
}

export default App;
