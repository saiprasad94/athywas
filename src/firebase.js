import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

console.log("Firebase Config:", firebaseConfig);

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
console.log("Firebase Auth:", auth);

export { auth };