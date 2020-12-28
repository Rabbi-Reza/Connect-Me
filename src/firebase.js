import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCMBkYXsUDNENza-IjHb29-6a1bv7XBFIw",
    authDomain: "react-connect-me.firebaseapp.com",
    projectId: "react-connect-me",
    storageBucket: "react-connect-me.appspot.com",
    messagingSenderId: "207673487691",
    appId: "1:207673487691:web:53e3cddaf48a4a2737b8ce"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider, storage };