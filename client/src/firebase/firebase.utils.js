import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA-mGUlowbdECOu4wt5jESCFTUkWKwjboI",
  authDomain: "cloth-shop-8e3bc.firebaseapp.com",
  projectId: "cloth-shop-8e3bc",
  storageBucket: "cloth-shop-8e3bc.appspot.com",
  messagingSenderId: "673161543586",
  appId: "1:673161543586:web:0cf457e5945778bd17fcfb",
  measurementId: "G-5GVBYB14DK"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
