// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsMQ9aEojMZtdb_YPncuY_pwPllcU00qE",
  authDomain: "pgfinder-85457.firebaseapp.com",
  projectId: "pgfinder-85457",
  storageBucket: "pgfinder-85457.appspot.com",
  messagingSenderId: "66400106306",
  appId: "1:66400106306:web:564159db4c9cb324483adb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase();