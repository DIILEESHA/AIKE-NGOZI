// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCwcMmXZIGTL4212-IPCTcZ8pbwWFp8zB4",
  authDomain: "halo-d30eb.firebaseapp.com",
  projectId: "halo-d30eb",
  storageBucket: "halo-d30eb.firebasestorage.app",
  messagingSenderId: "324343967382",
  appId: "1:324343967382:web:7d6a6a0854e9cbb2ec1cb7",
  measurementId: "G-1D5QCQLFR3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
