const fireBaseApp = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const {
  FB_apiKey: apiKey,
  FB_authDomain: authDomain,
  FB_databaseURL: databaseURL,
  FB_projectId: projectId,
  FB_storageBucket: storageBucket,
  FB_messagingSenderId: messagingSenderId,
  FB_appId: appId
} = process.env

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = fireBaseApp.initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = { app, db };
