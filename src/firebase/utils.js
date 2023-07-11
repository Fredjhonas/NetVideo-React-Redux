import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from './config';

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
const db = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { uid } = userAuth;

  const userRef = doc(db, `users/${uid}`);
  const snapshot = await getDoc(userRef);
  console.log('🚀 ~ file: utils.js:24 ~ handleUserProfile ~ userRef:', userRef);
  console.log('🚀 ~ file: utils.js:24 ~ handleUserProfile ~ snapshot:', snapshot);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (error) {
      // console.log(error);
    }
  }
  return userRef;
};
