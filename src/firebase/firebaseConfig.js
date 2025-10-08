// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkxOnsWnw0AnINuO0-moWBHnWLrAKY554",
  authDomain: "user-authentication-011.firebaseapp.com",
  projectId: "user-authentication-011",
  storageBucket: "user-authentication-011.firebasestorage.app",
  messagingSenderId: "285795353691",
  appId: "1:285795353691:web:764a79f7984ac835682b7e",
  measurementId: "G-Y7R23VSEEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider};