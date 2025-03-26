import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_5MHwa33Use2sx7hqhmHmAzyo7nB7xhc",
    authDomain: "athywas-598c2.firebaseapp.com",
    projectId: "athywas-598c2",
    storageBucket: "athywas-598c2.firebasestorage.app",
    messagingSenderId: "950377775102",
    appId: "1:950377775102:web:1db8b18f6c83e52a840aaf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD_5MHwa33Use2sx7hqhmHmAzyo7nB7xhc",
//   authDomain: "athywas-598c2.firebaseapp.com",
//   projectId: "athywas-598c2",
//   storageBucket: "athywas-598c2.firebasestorage.app",
//   messagingSenderId: "950377775102",
//   appId: "1:950377775102:web:1db8b18f6c83e52a840aaf",
//   measurementId: "G-4SBM5WDWR5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);