// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFwaZF5DdqG6wGSyvqBfoVanQRMc7wTuQ",
    authDomain: "docai-9cc56.firebaseapp.com",
    projectId: "docai-9cc56",
    storageBucket: "docai-9cc56.appspot.com",
    messagingSenderId: "231908095749",
    appId: "1:231908095749:web:ee9596833efabcf2eae96c",
    measurementId: "G-X479CJJ0N0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };