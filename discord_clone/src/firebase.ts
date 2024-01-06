// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
import { GoogleAuthProvider, getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAnMUuDOmYbz-QS_RLc-h-V9PZDzurfCQE",
  authDomain: "discord-clone-9c5c4.firebaseapp.com",
  projectId: "discord-clone-9c5c4",
  storageBucket: "discord-clone-9c5c4.appspot.com",
  messagingSenderId: "588794185177",
  appId: "1:588794185177:web:0ad9952a9fa5f3bb2145c8",
  measurementId: "G-JXQ0V9NSLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB情報取得
const db = getFirestore(app);
// 認証情報取得
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
})

export { auth, provider, db };