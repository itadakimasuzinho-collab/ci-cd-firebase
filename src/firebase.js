import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzuVPgvtCDNqshZAbdJD0wkDkb4e53oAA",
  authDomain: "ci-cd-firebase-2343f.firebaseapp.com",
  projectId: "ci-cd-firebase-2343f",
  storageBucket: "ci-cd-firebase-2343f.firebasestorage.app",
  messagingSenderId: "35958784382",
  appId: "1:35958784382:web:f5ead75faf197c24c7332f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);