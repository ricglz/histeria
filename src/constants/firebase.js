import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAN80rbKXb9yNZ-bo3t5MtTPBED_dy0YQY',
  authDomain: 'histeria-fb094.firebaseapp.com',
  projectId: 'histeria-fb094',
  storageBucket: 'histeria-fb094.appspot.com',
  messagingSenderId: '791864834114',
  appId: '1:791864834114:web:db1f7e19164ce75d8115db',
  measurementId: 'G-8GG2FY0DRZ',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
