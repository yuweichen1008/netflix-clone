import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "netflix-4f043.firebaseapp.com",
  projectId: "netflix-4f043",
  storageBucket: "netflix-4f043.appspot.com",
  messagingSenderId: "777311224280",
  appId: "1:777311224280:web:ff24d97377b273dc2b72ad"
};

// Prevent re-initialisation on Next.js hot reloads
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export default app
export { auth, db }