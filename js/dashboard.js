import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";

const firebaseapp = initializeApp ({

  apiKey: "AIzaSyAEFTx1TpA0o_cdTpFAviUEO4r2sDS1_Bc",
  authDomain: "ulaq-4be8f.firebaseapp.com",
  projectId: "ulaq-4be8f",
  storageBucket: "ulaq-4be8f.appspot.com",
  messagingSenderId: "4744659662",
  appId: "1:4744659662:web:8d191334a226fbe2f3469f",
  measurementId: "G-MT0PK7J59D"

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

