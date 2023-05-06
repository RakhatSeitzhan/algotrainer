import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj_cTYvJNl-VczMX53m17qFsSdgym5joo",
    authDomain: "algotrainer-a816e.firebaseapp.com",
    projectId: "algotrainer-a816e",
    storageBucket: "algotrainer-a816e.appspot.com",
    messagingSenderId: "619675130939",
    appId: "1:619675130939:web:6feec10c78e69cf1b0d01e",
    measurementId: "G-LR053L9TBY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db