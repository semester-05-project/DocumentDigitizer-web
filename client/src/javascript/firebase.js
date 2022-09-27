// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB97hiOBzCzV3-kWAtqa5AnwOHZkwrt8G4",
    authDomain: "document-digitizer-15b9e.firebaseapp.com",
    databaseURL: "https://document-digitizer-15b9e-default-rtdb.firebaseio.com",
    projectId: "document-digitizer-15b9e",
    storageBucket: "document-digitizer-15b9e.appspot.com",
    messagingSenderId: "626534464265",
    appId: "1:626534464265:web:58d83afee742ecfb3771d8"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage = getStorage(app);
export const db = getFirestore(app);