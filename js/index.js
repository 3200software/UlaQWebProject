import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';



const firebaseapp = initializeApp ({

  apiKey: "AIzaSyAEFTx1TpA0o_cdTpFAviUEO4r2sDS1_Bc",
  authDomain: "ulaq-4be8f.firebaseapp.com",
  projectId: "ulaq-4be8f",
  storageBucket: "ulaq-4be8f.appspot.com",
  messagingSenderId: "4744659662",
  appId: "1:4744659662:web:8d191334a226fbe2f3469f",
  measurementId: "G-MT0PK7J59D"


});

  // Initialize Firebase
const auth = getAuth();

onAuthStateChanged(auth, user => {

  if (user != null) {

    window.location.href = "dashboard.html"
      console.log('logged in')

  } else {

      console.log('no user')

  };

  
} );

let btnlogin = document.getElementById("loginButton");

btnlogin.addEventListener("click", function(evets) {
  
  
    let email = document.getElementById("InputEmail1").value;
    let password = document.getElementById("InputPassword1").value;

    console.log(email,password)

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      window.location.href = "dashboard.html"
      const user = userCredential.user;
    // ...
     })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
      
    

    


        
      
       evets.preventDefault();
    

     

    });


