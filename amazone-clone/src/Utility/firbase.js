
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPHQw5fRgEOx2QdEwfMwQOoyFJ0-DbH3U",
  authDomain: "new-73179.firebaseapp.com",
  projectId: "new-73179",
  storageBucket: "new-73179.firebasestorage.app",
  messagingSenderId: "361997301468",
  appId: "1:361997301468:web:ea7f44c3c46e927a316619"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()