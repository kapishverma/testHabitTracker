import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC6MxxyeLM-expTgLFW-y7b5uSYXQWZCS4",
    authDomain: "habit-tracker-d91b1.firebaseapp.com",
    projectId: "habit-tracker-d91b1",
    storageBucket: "habit-tracker-d91b1.appspot.com",
    messagingSenderId: "232580728473",
    appId: "1:232580728473:web:57f6bcba2c093d88409a08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);




