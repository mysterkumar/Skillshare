import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAf6eMV9YBF552FYmRd1m10sZeNCNkhs3E",  // ✅ From Firebase Console
  authDomain: "skillshare-355e2.firebaseapp.com",  // ✅ Add this
  projectId: "skillshare-355e2",  
  storageBucket: "skillshare-355e2.appspot.com",  // ✅ Fix this
  messagingSenderId: "561840984280",  // ✅ Add this from Firebase
  appId: "1:561840984280:android:bdf7a1319353290a3907ad",  
};

const app = initializeApp(firebaseConfig);
export default app;
