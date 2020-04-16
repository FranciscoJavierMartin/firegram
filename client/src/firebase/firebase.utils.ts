import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import uuid from 'uuid';
import { FirebaseUser } from '../interfaces/types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export const createUserProfileDocument = async (
  userAuth: any,
  additonalData?: any
) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
      });
    } catch (err) {
      console.log('Error creating  user', err.message);
    }
  }

  return userRef;
};

export const getCurrentUser = (): Promise<FirebaseUser> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const uploadPost = async (blob: Blob, title: string): Promise<void> => {
  const imageUniqueName = uuid.v4();

  const imageUrl = await (
    await storage
      .ref(`images/${auth.currentUser?.uid}/${imageUniqueName}.png`)
      .put(blob)
  ).ref.getDownloadURL();

  firestore.collection('posts').add({
    imageUrl,
    title,
    createAt: new Date()
  });
};

firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
