import * as firebase from "firebase"

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.VUE_APP_FIREBASE_APP_ID,
//   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyB7zPo4sPW_5ybUM1G3VKb0P0ocuBLnjxM",
  authDomain: "yogurt-vuex.firebaseapp.com",
  databaseURL: "https://yogurt-vuex.firebaseio.com",
  projectId: "yogurt-vuex",
  storageBucket: "yogurt-vuex.appspot.com",
  messagingSenderId: "1084859248400",
  appId: "1:1084859248400:web:47ca48999801bd3be47f95",
  measurementId: "G-H4R03SEZRJ"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const usersCollection = db.collection('users')

export { firebase, db, usersCollection }