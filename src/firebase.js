import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD3NO3scJdoZAHbL6pg1RTmAmtxkFXWvZ8',
  authDomain: 'messenger-clone-ff1f1.firebaseapp.com',
  projectId: 'messenger-clone-ff1f1',
  storageBucket: 'messenger-clone-ff1f1.appspot.com',
  messagingSenderId: '137206201734',
  appId: '1:137206201734:web:3a36618c680fe3831b0007',
  measurementId: 'G-NMHF560V3L',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
