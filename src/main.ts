import App from './App.svelte'
import { initializeApp } from "firebase/app";

// Not sure if this is needs but just in case
initializeApp({
  apiKey: "AIzaSyAlj_cTP4XzeheCCK7P0y4OJUhWSMFpNXk",
  authDomain: "mtg-lands.firebaseapp.com",
  projectId: "mtg-lands",
  storageBucket: "mtg-lands.appspot.com",
  messagingSenderId: "978292521286",
  appId: "1:978292521286:web:844fba4342f7b0bbab0d47"
});


const app = new App({
  target: document.getElementById('app'),
})

export default app
