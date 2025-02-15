import { initializeApp } from "hhttps://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getAnalytics } from "hhttps://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseapp = initializeApp ({
  
  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
    authDomain: "ulaq-1e47e.firebaseapp.com",
    projectId: "ulaq-1e47e",
    storageBucket: "ulaq-1e47e.appspot.com",
    messagingSenderId: "790902980229",
    appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
    measurementId: "G-E0J48THPNY"


});

const auth = getAuth();

onAuthStateChanged(auth, user => {

  if (user != null) {

      console.log('logged in')

  } else {

      window.location.href ="index.html"

  };

  
} );


const btnLogout = document.getElementById("logoutButton");


btnLogout.addEventListener("click",()=> {

  signOut(auth).then(() => {
  window.location.href ="index.html"
    }).catch((error) => {
  
  });


});

