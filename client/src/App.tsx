/* eslint-disable */
// TODO: Remove the previous line
import React, { useEffect } from 'react';
import './App.scss';
import LoginPage from './pages/login/LoginPage2';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from './store/user/userActions';
import SignUpPage from './pages/signup/SignUpPage';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { IGlobalState } from './interfaces/states';
import { FirebaseUser } from './interfaces/types';
import { selectCurrentUser } from './store/user/userSelectors';
import { SIGNIN, SIGNUP , HOME, USER_PROFILE} from './constants/routes';
import { Layout } from 'antd';
import Navbar from './components/navbar/Navbar';
import UserProfile from './pages/user-profile/UserProfile';

const { Header, Footer, Sider, Content } = Layout;


const App: React.FC = () => {
  const dispatch = useDispatch();
  let unsubscribeFromAuth: any = null;
  const currentUser = useSelector<IGlobalState, FirebaseUser>(selectCurrentUser);
  const { Content, Footer } = Layout;

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
    <Layout>
      <Navbar/>
      <Content>
      <Switch>
        <Route path={SIGNIN} component={LoginPage}/>
        <Route path={SIGNUP} component={SignUpPage}/>
        <Route path={USER_PROFILE} component={UserProfile}/>
        <Route exact path={HOME} component={HomePage}/>
      </Switch>
      </Content>
    </Layout>
  );
}

export default App;
