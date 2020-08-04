import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseApp = firebase.initializeApp = {
    apiKey: "AIzaSyC5TpqSpG-g940qIVapaVZRskIRePcKhOI",
    authDomain: "budget-planner-7865e.firebaseapp.com",
    databaseURL: "https://budget-planner-7865e.firebaseio.com",
    projectId: "budget-planner-7865e",
    storageBucket: "budget-planner-7865e.appspot.com",
    messagingSenderId: "359196116841",
    appId: "1:359196116841:web:da26b856ffeb40a964dff8",
    measurementId: "G-R9Y5BDEJK0"
};

export const firestore = firebase.firestore();

export default firebase;