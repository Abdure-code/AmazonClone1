import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyfQuh_WeyBhy1nSFMv0oELELHpoCtF_k",
  authDomain: "clone-cd64b.firebaseapp.com",
  projectId: "clone-cd64b",
  storageBucket: "clone-cd64b.firebasestorage.app",
  messagingSenderId: "801101535191",
  appId: "1:801101535191:web:cb248e94af3b040d42dd92",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
