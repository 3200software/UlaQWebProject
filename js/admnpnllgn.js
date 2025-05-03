import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
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
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseapp = initializeApp({
  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
  authDomain: "ulaq-1e47e.firebaseapp.com",
  projectId: "ulaq-1e47e",
  storageBucket: "ulaq-1e47e.appspot.com",
  messagingSenderId: "790902980229",
  appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
  measurementId: "G-E0J48THPNY",
});

// Initialize Firebase
const auth = getAuth(firebaseapp);
const storage = getStorage(firebaseapp);
const db = getFirestore(firebaseapp);

let btnlogin = document.getElementById("loginButton");

btnlogin.addEventListener("click", function (event) {
  event.preventDefault();

  let email = document.getElementById("InputEmail1").value.trim();
  let password = document.getElementById("InputPassword1").value.trim();

  // Email kontrolü
  if (!email) {
    alert("E-posta adresi boş bırakılamaz");
    return;
  }

  // Email formatı kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Geçerli bir e-posta adresi giriniz");
    return;
  }

  // Şifre kontrolü
  if (!password) {
    alert("Şifre boş bırakılamaz");
    2;
    return;
  }

  // Şifre uzunluğu kontrolü
  if (password.length < 6) {
    alert("Şifre en az 6 karakter olmalıdır");
    return;
  }

  // Loading durumunu göster
  btnlogin.disabled = true;
  btnlogin.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Giriş yapılıyor...';

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      onAuthStateChanged(auth, async (user) => {
        if (user != null) {
          try {
            const queryUser = query(
              collection(db, "Users"),
              where("email", "==", user.email)
            );

            const UsersInfo = await getDocs(queryUser);

            if (UsersInfo.empty) {
              alert("Kullanıcı bilgileri bulunamadı!");
              signOut(auth);
              return;
            }

            UsersInfo.forEach((doc) => {
              const usersInfo = doc.data().userType;

              if (usersInfo == "1") {
                console.log("Giriş başarılı!");
                window.location.href = "dashboard.html";
              } else {
                alert("Bu sayfaya giriş yetkiniz yok!");
                signOut(auth)
                  .then(() => {
                    window.location.href = "admnpnllgn.html";
                  })
                  .catch((error) => {
                    console.error("Çıkış yapılırken hata oluştu:", error);
                  });
              }
            });
          } catch (error) {
            console.error("Firestore hatası:", error);
            alert("Kullanıcı bilgileri alınırken bir hata oluştu!");
          }
        }
      });
    })
    .catch((error) => {
      // Hata mesajlarını Türkçeleştir
      let errorMessage = "Giriş yapılırken bir hata oluştu!";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Geçersiz email formatı!";
          break;
        case "auth/user-disabled":
          errorMessage = "Bu hesap devre dışı bırakılmış!";
          break;
        case "auth/user-not-found":
          errorMessage = "Bu email ile kayıtlı kullanıcı bulunamadı!";
          break;
        case "auth/wrong-password":
          errorMessage = "Hatalı şifre!";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin!";
          break;
        case "auth/network-request-failed":
          errorMessage = "İnternet bağlantınızı kontrol edin!";
          break;
      }

      alert(errorMessage);
      console.error("Giriş hatası:", error);
    })
    .finally(() => {
      // Loading durumunu gizle
      btnlogin.disabled = false;
      btnlogin.textContent = "Giriş Yap";
    });
});
