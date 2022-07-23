import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./stuff";

// Intialize the application
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Intialize the services
export const database = getFirestore();

// Collection Reference
export const collectionReference = collection(database, "todos");
