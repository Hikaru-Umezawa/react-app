import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const fireConfig = {
  apiKey: "AIzaSyC9x0JeHSKlD6FPhlQkrrGx79CZC4z6C3U",
  authDomain: "react-app-61855.firebaseapp.com",
  projectId: "react-app-61855",
  storageBucket: "react-app-61855.appspot.com",
  messagingSenderId: "367916150227",
  appId: "1:367916150227:web:fe64ccdaede1e7abeb1326",
  databaseURL: "https://react-app-61855.firebaseio.com"
}

const firebase = initializeApp(fireConfig);

export const auth = getAuth(firebase);

export const db = getFirestore();
