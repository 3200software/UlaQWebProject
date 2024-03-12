import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  deleteField,
  getDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";



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
  const auth = getAuth(firebaseapp);
  const storage = getStorage(firebaseapp);
  const db = getFirestore(firebaseapp);





let btnlogin = document.getElementById("loginButton");

btnlogin.addEventListener("click", function(evets) {
  
  
    let email = document.getElementById("InputEmail1").value;
    let password = document.getElementById("InputPassword1").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        

      onAuthStateChanged(auth, async user => {

        if (user != null) {
      
     

          const queryUser = query(collection(db,"Users"),where("email", "==", user.email));
      
          const UsersInfo = await getDocs(queryUser);

     
          
          UsersInfo.forEach((doc) => {
        
         

            const usersInfo = doc.data().userStatus;
      
            if (usersInfo == "0001") {

             
      
              window.location.href = "dashboard.html"
              const user = userCredential.user;
      
      
            } else {
      
             
              const auth = getAuth();
               signOut(auth).then(() => {
                window.location.href = "index.html"
               alert("Bu sayfaya giriş yetkiniz yok! Lütfen gidin!!")
               }).catch((error) => {
           // An error happened.
               });
      
      
            }
      
            
      
        
          })
      
          
      
           
      
        } else {
      
       
      
        };
      
        
      } );


    // ...



     })
    .catch((error) => {

      alert("Email veya şifre hatalı! Lütfen bilgilerinizi kontrol edip tekrar deneyiniz!")
    const errorCode = error.code;
    const errorMessage = error.message;
    });
      
    

    


        
      
       evets.preventDefault();
    

     

    });


