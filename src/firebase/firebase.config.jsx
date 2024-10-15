// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMuSHU612AVe267rELQX3OS0vHl6c-EAQ",
  authDomain: "librarys-ca80e.firebaseapp.com",
  projectId: "librarys-ca80e",
  storageBucket: "librarys-ca80e.appspot.com",
  messagingSenderId: "1727867639",
  appId: "1:1727867639:web:6e3a0b2fc10778c2a201f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth