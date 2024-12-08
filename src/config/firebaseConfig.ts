import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { firebaseConfig } from '../constants/sensitiveConstants';
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);