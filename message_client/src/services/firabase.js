import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APP_KEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDyhemlxILGm0KEV-u2PBpkuUIqZhbr-hM",
  authDomain: "messageio-8955d.firebaseapp.com",
  databaseURL: "https://messageio-8955d-default-rtdb.firebaseio.com",
  projectId: "messageio-8955d",
  storageBucket: "messageio-8955d.appspot.com",
  messagingSenderId: "304842517084",
  appId: "1:304842517084:web:f8246084e2c8301ba45499"
};

firebase.initializeApp(firebaseConfig)
console.log(firebaseConfig)

const auth = firebase.auth();

export { firebase, auth }