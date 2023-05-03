
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyApHwm0hQN7zvVeOeknxyK6SAgqTD7OKLo",
  authDomain: "recipy-maker.firebaseapp.com",
  projectId: "recipy-maker",
  storageBucket: "recipy-maker.appspot.com",
  messagingSenderId: "964461108960",
  appId: "1:964461108960:web:ae1f5b927ebcefaf8c3a85",
  measurementId: "G-VXV4KEHCED"
}

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const storage = getStorage(app);

