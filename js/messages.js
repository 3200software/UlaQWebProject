import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase yapılandırması
const firebaseapp = initializeApp({
  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
  authDomain: "ulaq-1e47e.firebaseapp.com",
  projectId: "ulaq-1e47e",
  storageBucket: "ulaq-1e47e.appspot.com",
  messagingSenderId: "790902980229",
  appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
  measurementId: "G-E0J48THPNY",
});

const db = getFirestore(firebaseapp);

// DOM elementleri
const messagesList = document.getElementById("messagesList");
const messageSearch = document.getElementById("messageSearch");
const messageFilter = document.getElementById("messageFilter");

// Mesajları formatla ve göster
function formatMessage(message) {
  const date = new Date(message.timestamp);
  const formattedDate = date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <div class="message-card ${message.isRead ? "read" : "unread"}" data-id="${
    message.id
  }">
      <div class="message-header">
        <h3>${message.name}</h3>
        <span class="message-date">${formattedDate}</span>
      </div>
      <div class="message-content">
        <p><strong>E-posta:</strong> ${message.email}</p>
        ${
          message.phone
            ? `<p><strong>Telefon:</strong> ${message.phone}</p>`
            : ""
        }
        <p class="message-text">${message.message}</p>
      </div>
      ${!message.isRead ? '<div class="unread-badge">Yeni</div>' : ""}
    </div>
  `;
}

// Mesajları getir ve listele
async function loadMessages(filter = "all") {
  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    let messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    // Filtreleme
    if (filter === "new") {
      messages = messages.filter((msg) => !msg.isRead);
    } else if (filter === "read") {
      messages = messages.filter((msg) => msg.isRead);
    }

    // Arama filtresi
    const searchTerm = messageSearch.value.toLowerCase();
    if (searchTerm) {
      messages = messages.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm) ||
          msg.email.toLowerCase().includes(searchTerm) ||
          msg.message.toLowerCase().includes(searchTerm)
      );
    }

    // Mesajları listele
    messagesList.innerHTML =
      messages.length > 0
        ? messages.map(formatMessage).join("")
        : '<div class="no-messages">Henüz mesaj bulunmuyor.</div>';

    // Mesaj tıklama olayını ekle
    document.querySelectorAll(".message-card").forEach((card) => {
      card.addEventListener("click", async () => {
        const messageId = card.dataset.id;
        const messageRef = doc(db, "messages", messageId);

        // Mesajı okundu olarak işaretle
        if (!card.classList.contains("read")) {
          await updateDoc(messageRef, {
            isRead: true,
          });
          card.classList.add("read");
          card.querySelector(".unread-badge")?.remove();
        }
      });
    });
  } catch (error) {
    console.error("Mesajlar yüklenirken hata:", error);
    messagesList.innerHTML =
      '<div class="error-message">Mesajlar yüklenirken bir hata oluştu.</div>';
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadMessages();

  messageSearch.addEventListener("input", () => {
    loadMessages(messageFilter.value);
  });

  messageFilter.addEventListener("change", () => {
    loadMessages(messageFilter.value);
  });
});
