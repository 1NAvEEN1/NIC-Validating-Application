// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTr0bx0aCrt1f_9GVTk0_mLZPa1QR3GN8",
  authDomain: "send-otp-ef800.firebaseapp.com",
  projectId: "send-otp-ef800",
  storageBucket: "send-otp-ef800.appspot.com",
  messagingSenderId: "456626057417",
  appId: "1:456626057417:web:973993bbe60d43aa1d1d18",
  measurementId: "G-YVN9K09QLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

export const authentication = getAuth(app);