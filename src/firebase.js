import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDiRqqZbNpYLhr3KaaIEHKFVfPm9fJdM_c",
    authDomain: "my-todo-app-e627c.firebaseapp.com",
    databaseURL: "https://my-todo-app-e627c.firebaseio.com",
    projectId: "my-todo-app-e627c",
    storageBucket: "my-todo-app-e627c.appspot.com",
    messagingSenderId: "1054870842780",
    appId: "1:1054870842780:web:26b666856bce620c676c59",
    measurementId: "G-SW1KYK6MKL"
};

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
const myTodosRef = databaseRef.child("myTodos");

export default myTodosRef;