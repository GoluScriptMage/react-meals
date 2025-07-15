// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAVutOsMWnzDNyOtjCyat5YfodYUcIWoI",
  authDomain: "react-meals-52033.firebaseapp.com",
  databaseURL:
    "https://react-meals-52033-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-meals-52033",
  storageBucket: "react-meals-52033.firebasestorage.app",
  messagingSenderId: "662520401100",
  appId: "1:662520401100:web:0ce0840d29fc5bd336c669",
  measurementId: "G-KVERKRD228",
};

// To not write the try and catch in every function
const catchAsync = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };
};

// To validate the arguments
const validateArguments = (...args) => {
  for (const arg of args) {
    if (!arg || typeof arg !== "string") {
      throw new Error("Invalid arguments provided");
    }
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
export { db, ref, set, get, child, push, catchAsync, validateArguments };
