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

const products = document.querySelector(".invWritingCard");

function createInvWritingArray([
  invWritingDocId,
  category,
  invWriting,
  addDate,
  mostPopular,
]) {
  let proCode = `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <h5 class="card-title mb-0 text-primary">${getCategoryName(
              category
            )}</h5>
            <div class="btn-group">
              <button type="button" data-keys="${invWritingDocId}" class="btn btn-sm btn-outline-primary invBtn">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <p class="card-text mb-0" style="min-height: 60px; line-height: 1.5;">${invWriting}</p>
        </div>
        <div class="card-footer bg-transparent border-top-0">
          <small class="text-muted">Eklenme: ${new Date(
            addDate.toDate()
          ).toLocaleDateString("tr-TR")}</small>
        </div>
      </div>
    </div>
  `;
  products.innerHTML += proCode;
}

var invWritingDocumentId;
var invWritingType;
var sendButtonstatus;

$("body").on("click", ".invBtn", async function () {
  var $key = $(this).data("keys");

  invWritingDocumentId = $key;

  sendButtonstatus = "Edit";

  $("#invWritngDeleteButton").show();

  const docRef = doc(db, "InvitationWriting", invWritingDocumentId);
  const docs = await getDoc(docRef);

  if (docs.exists()) {
    const firebaseInvCategory = docs.data().category;

    invWritingType = firebaseInvCategory;

    $("#inv-writingModalSelect").val(firebaseInvCategory);

    const firebaseInvWriting = docs.data().invWriting;

    $("#invWritngInput").val(firebaseInvWriting);
  }

  const qaModal = $("#inv-writingModal");

  qaModal.modal("show");
});

$("#invWritngSendButton").on("click", async function () {
  const date = new Date();

  if (sendButtonstatus == "Edit") {
    try {
      const updateRef = doc(db, "InvitationWriting", invWritingDocumentId);

      await updateDoc(updateRef, {
        category: parseInt(invWritingType),
        invWriting: $("#invWritngInput").val(),
        addDate: date,
      });

      $("#inv-writingModal").modal("hide");
      // İçeriği güncelle
      await loadInvWritings();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme sırasında bir hata oluştu!");
    }
  } else if (sendButtonstatus == "Add") {
    const writingText = $("#invWritngInput").val().trim();

    if (!writingText) {
      alert("Lütfen bir yazı giriniz!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "InvitationWriting"), {
        category: parseInt(invWritingType),
        invWriting: writingText,
        addDate: date,
        mostPopular: 0,
      });

      $("#inv-writingModal").modal("hide");
      // İçeriği güncelle
      await loadInvWritings();
    } catch (error) {
      console.error("Ekleme hatası:", error);
      alert("Ekleme sırasında bir hata oluştu!");
    }
  }
});

$("#invWritngDeleteButton").on("click", async function () {
  if (!confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) {
    return;
  }
  try {
    const docRef = doc(db, "InvitationWriting", invWritingDocumentId);
    await deleteDoc(docRef);
    $("#inv-writingModal").modal("hide");
    // Sayfayı yenilemek yerine içeriği güncelle
    await loadInvWritings();
  } catch (error) {
    console.error("Silme hatası:", error);
    alert("Silme işlemi sırasında bir hata oluştu!");
  }
});

$("#inv-writingModalSelect").on("change", async function () {
  invWritingType = $("#inv-writingModalSelect").val();
});

const getData = query(collection(db, "InvitationWriting"));

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {
  const invWritingDocId = doc.id;

  const category = doc.data().category;
  const invWriting = doc.data().invWriting;
  const addDate = doc.data().addDate;
  const mostPopular = doc.data().mostPopular;

  let InvWritingItem = [
    invWritingDocId,
    category,
    invWriting,
    addDate,
    mostPopular,
  ];

  createInvWritingArray(InvWritingItem);
});

$(document).ready(function () {
  $("#addInvWritngButton").on("click", function () {
    // Select alanının seçilen değerini al
    sendButtonstatus = "Add";
    invWritingType = "1";
    $("#invWritngDeleteButton").hide();
    $("#inv-writingModalSelect").val("1");
    $("#invWritngInput").val("");
    const qaModal = $("#inv-writingModal");

    qaModal.modal("show");
  });
});

// Kategori adını getir
function getCategoryName(categoryId) {
  const categories = {
    1: "Düğün",
    2: "Nikah",
    3: "Nişan",
    4: "Kına Gecesi",
    5: "Sünnet",
  };
  return categories[categoryId] || "Bilinmeyen Kategori";
}

// Filtreleme işlevi
async function filterWritings(categoryId) {
  try {
    const container = document.querySelector(".invWritingCard");
    container.innerHTML = "";

    let queryRef;
    if (categoryId === "0") {
      // Tüm yazıları getir
      queryRef = query(collection(db, "InvitationWriting"));
    } else {
      // Seçili kategoriye göre filtrele
      queryRef = query(
        collection(db, "InvitationWriting"),
        where("category", "==", parseInt(categoryId))
      );
    }

    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
      const invWritingDocId = doc.id;
      const category = doc.data().category;
      const invWriting = doc.data().invWriting;
      const addDate = doc.data().addDate;
      const mostPopular = doc.data().mostPopular;

      let proCode = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-title mb-0 text-primary">${getCategoryName(
                  category
                )}</h5>
                <div class="btn-group">
                  <button type="button" data-keys="${invWritingDocId}" class="btn btn-sm btn-outline-primary invBtn">
                    <i class="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
              <p class="card-text mb-0" style="min-height: 60px; line-height: 1.5;">${invWriting}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0">
              <small class="text-muted">Eklenme: ${
                addDate
                  ? new Date(addDate.toDate()).toLocaleDateString("tr-TR")
                  : "Tarih yok"
              }</small>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += proCode;
    });
  } catch (error) {
    console.error("Filtreleme hatası:", error);
    alert("Filtreleme sırasında bir hata oluştu!");
  }
}

// Sayfa yüklendiğinde ve filtre değiştiğinde
$(document).ready(function () {
  // Sayfa yüklendiğinde tüm yazıları göster
  filterWritings("0");

  // Filtre değişikliğini dinle
  $("#inwWritingFilterSelect").on("change", function () {
    const selectedValue = $(this).val();
    filterWritings(selectedValue);
  });
});

// Davetiye yazılarını yükle
async function loadInvWritings() {
  try {
    const getData = query(collection(db, "InvitationWriting"));
    const querySnapshot = await getDocs(getData);
    const container = document.querySelector(".invWritingCard");
    container.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const invWritingDocId = doc.id;
      const category = doc.data().category;
      const invWriting = doc.data().invWriting;
      const addDate = doc.data().addDate;
      const mostPopular = doc.data().mostPopular;

      let proCode = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="card-title mb-0 text-primary">${getCategoryName(
                  category
                )}</h5>
                <div class="btn-group">
                  <button type="button" data-keys="${invWritingDocId}" class="btn btn-sm btn-outline-primary invBtn">
                    <i class="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
              <p class="card-text mb-0" style="min-height: 60px; line-height: 1.5;">${invWriting}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0">
              <small class="text-muted">Eklenme: ${new Date(
                addDate.toDate()
              ).toLocaleDateString("tr-TR")}</small>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += proCode;
    });
  } catch (error) {
    console.error("Davetiye yazıları yüklenirken hata:", error);
  }
}
