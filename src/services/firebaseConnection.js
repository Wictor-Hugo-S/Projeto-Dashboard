import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDgmGibnvBNFRH0P8K085ccagDmOFPD9a8",
  authDomain: "sistema-7b3ad.firebaseapp.com",
  projectId: "sistema-7b3ad",
  storageBucket: "sistema-7b3ad.appspot.com",
  messagingSenderId: "318365927390",
  appId: "1:318365927390:web:0119638c56aa4d6f6d7f4f",
  measurementId: "G-1D3WB1Q7YC"

  
};


// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

