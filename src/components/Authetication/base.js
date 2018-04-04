import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    // apiKey: process.env.REACT_APP_FIREBASE_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
    apiKey: "AIzaSyAzTrwSyBJFohvgjEkJcQClL4AJOEZqnZ4",
    authDomain: "ticketservice-5401b.firebaseapp.com",
    databaseURL: "https://ticketservice-5401b.firebaseio.com",
    projectId: "ticketservice-5401b",
    storageBucket: "ticketservice-5401b.appspot.com",
    messagingSenderId: "254370707088"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {app, base, facebookProvider}