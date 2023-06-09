
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const signInUser = async (
  email: string,
  password: string
) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signUpUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const SignOutUser = async () => await signOut(auth);
