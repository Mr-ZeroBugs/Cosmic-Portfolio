// lib/firebase.ts
'use client';
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyCiErnT8UFzAiDI0kDDoInZpoi0L203FmQ",

  authDomain: "cosmic-portfolio-5e8ac.firebaseapp.com",

  projectId: "cosmic-portfolio-5e8ac",

  storageBucket: "cosmic-portfolio-5e8ac.firebasestorage.app",

  messagingSenderId: "1077027754874",

  appId: "1:1077027754874:web:269673e123bddcd191bcc3",

  measurementId: "G-8K7RJE9EMB"

};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ เพิ่มบรรทัดนี้