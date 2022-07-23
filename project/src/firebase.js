import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Intialize the application
export const auth = getAuth();

// Intialize the services
export const database = getFirestore();

// Collection Reference
export const collectionReference = collection(database, "todos");
