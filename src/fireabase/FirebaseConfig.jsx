// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOwhlNM7rbKXRq-4v1xEIJYz3pUK7anc",
  authDomain: "richroyalfarm-db.firebaseapp.com",
  projectId: "richroyalfarm-db",
  storageBucket: "richroyalfarm-db.firebasestorage.app",
  messagingSenderId: "1000108449322",
  appId: "1:1000108449322:web:47776130dcadc576992d53",
  // measurementId: "G-KQPGSV65B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}