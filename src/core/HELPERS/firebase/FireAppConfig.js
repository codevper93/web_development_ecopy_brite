import { initializeApp } from "firebase/app";

const config = {
    apiKey: process.env.REACT_APP_firebaseAppConf_apiKey,
    authDomain: process.env.REACT_APP_firebaseAppConf_authDomain,
    projectId: process.env.REACT_APP_firebaseAppConf_projectId,
    storageBucket: process.env.REACT_APP_firebaseAppConf_storageBucket,
    messagingSenderId: process.env.REACT_APP_firebaseAppConf_messagingSenderId,
    appId: process.env.REACT_APP_firebaseAppConf_appId,
    databaseURL: process.env.REACT_APP_firebaseURI_base
};

export const appConfigFirebase = initializeApp(config);
