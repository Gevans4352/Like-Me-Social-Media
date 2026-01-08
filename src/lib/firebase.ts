import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatbox-aa1a3.firebaseapp.com",
  projectId: "reactchatbox-aa1a3",
  storageBucket: "reactchatbox-aa1a3.appspot.com",
  messagingSenderId: "10514631821",
  appId: "1:10514631821:web:b7a6950e28137312f626c4",
  measurementId: "G-QYLC0LCS1E"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("API Key:", import.meta.env.VITE_API_KEY);
console.log("API Key:", import.meta.env.VITE_API_KEY);


console.log("API Key:", import.meta.env.VITE_API_KEY);
console.log("Firebase Config:", firebaseConfig);