// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "full-stack-mern-real-state.firebaseapp.com",
  projectId: "full-stack-mern-real-state",
  storageBucket: "full-stack-mern-real-state.appspot.com",
  messagingSenderId: "519181025882",
  appId: "1:519181025882:web:002ec5ac6422cf867b8e63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);