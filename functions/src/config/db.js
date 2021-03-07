const firebase = require("firebase-admin");
const serviceAccount = require("../../premission.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const db = firebase.firestore();

module.exports = db;