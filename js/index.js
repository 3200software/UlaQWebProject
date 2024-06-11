import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';
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
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const firebaseapp = initializeApp ({

  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
    authDomain: "ulaq-1e47e.firebaseapp.com",
    projectId: "ulaq-1e47e",
    storageBucket: "ulaq-1e47e.appspot.com",
    messagingSenderId: "790902980229",
    appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
    measurementId: "G-E0J48THPNY"


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
      
            if (usersInfo == "1") {

             console.log("giris yapıldı")
      
              window.location.href = "dashboard.html"
              const user = userCredential.user;
      
      
            } else {
      
              console.log("giris yapılmadı")
             
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
      
        
      });


    // ...



     })
    .catch((error) => {

      alert("Email veya şifre hatalı! Lütfen bilgilerinizi kontrol edip tekrar deneyiniz!")
    const errorCode = error.code;
    const errorMessage = error.message;
    });
      
    

    


        
      
       evets.preventDefault();
    

     

    });


