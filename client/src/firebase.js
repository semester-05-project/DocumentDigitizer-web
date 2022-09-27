import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "document-digitizer-15b9e.firebaseapp.com",
    databaseURL: "https://document-digitizer-15b9e-default-rtdb.firebaseio.com",
    projectId: "document-digitizer-15b9e",
    storageBucket: "document-digitizer-15b9e.appspot.com",
    messagingSenderId: "626534464265",
    appId: "1:626534464265:web:58d83afee742ecfb3771d8"
};

const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
