import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYAL_vvVj7azFLvts_jghy0sYQ5QQAhEk",
  authDomain: "habit-tracker-650c7.firebaseapp.com",
  projectId: "habit-tracker-650c7",
  storageBucket: "habit-tracker-650c7.firebasestorage.app",
  messagingSenderId: "1071000930328",
  appId: "1:1071000930328:web:af7c93628ea9d751cd9b6d",
  measurementId: "G-PW01KLKZJN",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = typeof window !== "undefined" ? getAuth(app) : (null as any);
export const db = typeof window !== "undefined" ? getFirestore(app) : (null as any);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  return fbSignOut(auth);
}
