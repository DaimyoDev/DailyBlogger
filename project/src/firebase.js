import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUBAEfCqnDXLI488JDJmuyQrKcQOWoM3w",
  authDomain: "todo-project-60b73.firebaseapp.com",
  projectId: "todo-project-60b73",
  storageBucket: "todo-project-60b73.appspot.com",
  messagingSenderId: "176991439488",
  appId: "1:176991439488:web:eec21d984628d2b5cef465",
};

// Intialize the application
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Intialize the services
export const database = getFirestore();

// Collection Reference
export const collectionReference = collection(database, "todos");
