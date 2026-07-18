import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu_RQJmzPGEcuCI2OXObDM7hsIuND2vv4",
  authDomain: "ai-social-media-manager-a8e8c.firebaseapp.com",
  projectId: "ai-social-media-manager-a8e8c",
  storageBucket: "ai-social-media-manager-a8e8c.firebasestorage.app",
  messagingSenderId: "8167037348",
  appId: "1:8167037348:web:f61e0112e13a1e48390931"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);