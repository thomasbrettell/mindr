import {initializeApp} from "firebase/app";
import {getFunctions, connectFunctionsEmulator} from "firebase/functions";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import {getDatabase, connectDatabaseEmulator} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SEND_APP,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);

if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectDatabaseEmulator(database, "localhost", 9000);
}
export default app;
