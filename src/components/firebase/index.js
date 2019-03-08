import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDgSQbIjYkSwbQUejY1kbrzEcDPWtqP-mU',
  authDomain: 'coding-showcase.firebaseapp.com',
  databaseURL: 'https://coding-showcase.firebaseio.com',
  projectId: 'coding-showcase',
  storageBucket: 'coding-showcase.appspot.com',
  messagingSenderId: '204926732264'
};
firebase.initializeApp(config);

export const storage = firebase.storage();
export const storageRef = storage.ref();
export const database = firebase.database();
export const databaseRef = database.ref();
