import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4nt3xFt-sZGkvH69SZb0ctJ75azL81Z8",
  authDomain: "zen-notes-dbaf9.firebaseapp.com",
  projectId: "zen-notes-dbaf9",
  storageBucket: "zen-notes-dbaf9.appspot.com",
  messagingSenderId: "465539934480",
  appId: "1:465539934480:web:7bd034fa4505f67aeb9d95"
};

const app = getApps().length !==0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };