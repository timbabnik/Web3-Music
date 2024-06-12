// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLD9Cw1mSN9NcxED2CJEQGCnymAX-jwbc",
  authDomain: "music-5e2d4.firebaseapp.com",
  projectId: "music-5e2d4",
  storageBucket: "music-5e2d4.appspot.com",
  messagingSenderId: "707626337703",
  appId: "1:707626337703:web:7a174ea50f95f23ae2e282"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);
