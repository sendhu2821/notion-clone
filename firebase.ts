// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxTooIjzT0TiCegcZiyWyhZ3arPhoRqlA",
  authDomain: "notion-clone-61bfc.firebaseapp.com",
  projectId: "notion-clone-61bfc",
  storageBucket: "notion-clone-61bfc.firebasestorage.app",
  messagingSenderId: "433393007553",
  appId: "1:433393007553:web:4810efccbc2a2b8b1b4d40",
};

// Initialize Firebase with a condition to avoid multiple intialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
