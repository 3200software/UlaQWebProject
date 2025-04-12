// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
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

// Firebase configuration
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

// Contact Form Validation and Submission
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM yüklendi, form aranıyor...");

  const contactForm = document.querySelector("form"); // Formu direkt seç
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  console.log("Form elementleri seçildi:", {
    form: contactForm,
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    message: messageInput,
  });

  if (!contactForm) {
    console.error("Form bulunamadı!");
    return;
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submit eventi tetiklendi");

    // Form değerlerini al
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim() || null,
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    console.log("Form verileri hazırlandı:", formData);

    // Validasyon
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) {
      nameInput.classList.add("error");
      isValid = false;
      console.log("İsim alanı boş");
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      emailInput.classList.add("error");
      isValid = false;
      console.log("Email alanı geçersiz:", formData.email);
    }

    if (!formData.message) {
      messageInput.classList.add("error");
      isValid = false;
      console.log("Mesaj alanı boş");
    }

    if (!isValid) {
      console.log("Form validasyonu başarısız");
      alert("Lütfen tüm zorunlu alanları doğru şekilde doldurun.");
      return;
    }

    console.log("Form validasyonu başarılı, gönderim başlıyor");

    try {
      console.log("Anonim giriş denemesi başlıyor...");
      const anonUser = await signInAnonymously(auth);
      console.log("Anonim giriş başarılı:", {
        uid: anonUser.user.uid,
        isAnonymous: anonUser.user.isAnonymous,
      });

      console.log("Firestore'a veri gönderiliyor...");
      const docRef = await addDoc(collection(db, "messages"), {
        ...formData,
        userId: anonUser.user.uid,
      });
      console.log(
        "Veri başarıyla Firestore'a kaydedildi, döküman ID:",
        docRef.id
      );

      alert(
        "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız."
      );
      contactForm.reset();
      console.log("Form temizlendi");

      console.log("Anonim kullanıcı silme işlemi başlıyor...");
      await anonUser.user.delete();
      console.log("Anonim kullanıcı başarıyla silindi");
    } catch (error) {
      console.error("Hata detayları:", {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });

      if (error.code === "auth/operation-not-allowed") {
        console.log("Anonim giriş devre dışı hatası");
        alert(
          "Anonim giriş şu anda devre dışı. Lütfen daha sonra tekrar deneyin."
        );
      } else {
        console.log("Genel hata:", error.message);
        alert(
          "Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      }

      try {
        console.log("Hata sonrası kullanıcı silme denemesi...");
        const currentUser = auth.currentUser;
        console.log(
          "Mevcut kullanıcı durumu:",
          currentUser
            ? {
                uid: currentUser.uid,
                isAnonymous: currentUser.isAnonymous,
              }
            : "Kullanıcı yok"
        );

        if (currentUser && currentUser.isAnonymous) {
          await currentUser.delete();
          console.log("Kullanıcı başarıyla silindi");
        }
      } catch (deleteError) {
        console.error("Kullanıcı silme hatası:", {
          code: deleteError.code,
          message: deleteError.message,
          stack: deleteError.stack,
        });
      }
    }
  });
});
