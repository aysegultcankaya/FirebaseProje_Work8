import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwaBxw7p9zk50hKMFv7mS1VgFH-KaExfQ",
  authDomain: "odev-e7d98.firebaseapp.com",
  projectId: "odev-e7d98",
  storageBucket: "odev-e7d98.appspot.com",
  messagingSenderId: "1041545821669",
  appId: "1:1041545821669:web:994d9bf8b9e170f537830c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; //firebasein verdiği ayar objesi
