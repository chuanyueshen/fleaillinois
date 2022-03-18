import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAheLce-bZf0suYnEe9XC0HAqDwtN8wH3Y",
  authDomain: "cs498rk-fp-auth.firebaseapp.com",
  projectId: "cs498rk-fp-auth",
  storageBucket: "cs498rk-fp-auth.appspot.com",
  messagingSenderId: "834804963907",
  appId: "1:834804963907:web:6151b5d2b991ee75f012f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);