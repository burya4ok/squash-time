import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const firebaseConfig = {
  apiKey: 'AIzaSyAwhWqZ1PIWp7kfyAm-OTPdh4gRO_NN-s8',
  authDomain: 'squash-time.firebaseapp.com',
  databaseURL: 'https://squash-time-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'squash-time',
  storageBucket: 'squash-time.appspot.com',
  messagingSenderId: '518059014228',
  appId: '1:518059014228:web:1eb66c21f94716349b15c1',
  measurementId: 'G-NFB611F70P',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}

export const auth = firebase.auth
export const firestore = firebase.firestore

firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
})
