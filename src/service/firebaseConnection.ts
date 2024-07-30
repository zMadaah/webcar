
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAPUpIDWAI4FoC48gmd_KbgBO4f-bt272w",
  authDomain: "webcars-2f9cc.firebaseapp.com",
  projectId: "webcars-2f9cc",
  storageBucket: "webcars-2f9cc.appspot.com",
  messagingSenderId: "94933477572",
  appId: "1:94933477572:web:a57925b34640b049c6c191"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

export { db };