// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ9F69Re93DCLHQpOk0MRBCUi8K7zqHtM",
  authDomain: "fir-tuts-c4805.firebaseapp.com",
  projectId: "fir-tuts-c4805",
  storageBucket: "fir-tuts-c4805.appspot.com",
  messagingSenderId: "1048580537028",
  appId: "1:1048580537028:web:a43b5454dae67139b66791",
  measurementId: "G-D2ZC7XVXP4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app);

export const db = getFirestore(app);
