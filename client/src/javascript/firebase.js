// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4bjumGDyyjQ-if3nbJ24eeUy-MItJc8Q",
    authDomain: "documentscannerweb.firebaseapp.com",
    databaseURL: "https://documentscannerweb-default-rtdb.firebaseio.com",
    projectId: "documentscannerweb",
    storageBucket: "documentscannerweb.appspot.com",
    messagingSenderId: "663582207194",
    appId: "1:663582207194:web:cc97ac69e9e15914b289e3",
    measurementId: "G-D0GDRCXZYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()

export const db = getFirestore(app);