var firebase = require("firebase/app");
require ('firebase/database')

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
module.exports = firebase