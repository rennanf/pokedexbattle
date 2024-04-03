// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore" 

const firebaseConfig = {

  apiKey: "AIzaSyCFI1spPk-WW-DrZN9_Bofuq9fCao-bf7w",

  authDomain: "pokedexbattle.firebaseapp.com",

  projectId: "pokedexbattle",

  storageBucket: "pokedexbattle.appspot.com",

  messagingSenderId: "482875414943",

  appId: "1:482875414943:web:7239ee3993bd2569aac5aa",

  measurementId: "G-49CT1PVLS8"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB,"users");
export const pokemonListRef = collection(firebaseDB,"pokemonList");

// const analytics = getAnalytics(app);