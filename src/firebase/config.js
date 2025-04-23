import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJmBnLrnVmReimSMVC8DE69AAql7Zes3o",
  authDomain: "ideal-casting-profile.firebaseapp.com",
  projectId: "ideal-casting-profile",
  storageBucket: "ideal-casting-profile.firebasestorage.app",
  messagingSenderId: "418945639246",
  appId: "1:418945639246:web:355750cacb7209ca8ff41f",
  measurementId: "G-C5MHEK37LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 