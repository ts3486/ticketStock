// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
("https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js");
("https://www.gstatic.com/firebasejs/6.2.3/firebase-storage.js");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmxa-yYSOYkxIsubbdiRAsS6Ic8-PpzW0",
  authDomain: "ticketstock-94480.firebaseapp.com",
  projectId: "ticketstock-94480",
  storageBucket: "ticketstock-94480.appspot.com",
  messagingSenderId: "78191130099",
  appId: "1:78191130099:web:9a588648e708897ee1ce86",
  measurementId: "G-56T2Q23H9D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
