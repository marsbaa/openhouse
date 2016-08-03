import firebase from 'firebase';
var config = {
    apiKey: "8SrpAbTBbHwyp016lfCVSoSjX8nDcvUCwNlnMjDA",
    authDomain: "first-kick-open-house.firebaseapp.com",
    databaseURL: "https://first-kick-open-house.firebaseio.com/",
    storageBucket: "first-kick-open-house.appspot.com",
  };

firebase.initializeApp(config);

export var firebaseRef = firebase.database().ref();

export default firebaseRef;
