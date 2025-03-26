import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_5MHwa33Use2sx7hqhmHmAzyo7nB7xhc",
  authDomain: "athywas-598c2.firebaseapp.com",
  projectId: "athywas-598c2",
  storageBucket: "athywas-598c2.firebasestorage.app",
  messagingSenderId: "950377775102",
  appId: "1:950377775102:web:1db8b18f6c83e52a840aaf",
};

try {
  const existingApps = getApps();
  console.log("Existing Apps:", existingApps.length);
  let app;
  if (existingApps.length === 0) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase App Initialized:", app.name);
  } else {
    app = existingApps[0];
    console.log("Using Existing Firebase App:", app.name);
  }
  const auth = getAuth(app);
  console.log("Firebase Auth Initialized:", auth);
} catch (error) {
  console.error("Firebase Initialization Failed:", error);
}