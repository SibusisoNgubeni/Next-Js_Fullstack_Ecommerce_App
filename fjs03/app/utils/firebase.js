import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIjM-GJTpDhgbwmNWzYtciKupbWimnGBk",
    authDomain: "next-ecommerce-3f1d8.firebaseapp.com",
    projectId: "next-ecommerce-3f1d8",
    storageBucket: "next-ecommerce-3f1d8.appspot.com",
    messagingSenderId: "715873356898",
    appId: "1:715873356898:web:d38f78c7f8027fe09e153b"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
