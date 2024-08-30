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

    <div class="d-flex justify-content-between border rounded-2 m-1"> 

    <div class="row"
        
    <h6    class="m-2 p-1" style="padding: 1%;">${invWriting} </h6>

      </div>

    <button type="button" data-keys="${invWritingDocId}" class="btn btn-primary invBtn m-2">Düzenle</button>

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
    } catch (error) {
      console.log(error);
    }
  } else if (sendButtonstatus == "Add") {
    try {
      const docRef = await addDoc(collection(db, "InvitationWriting"), {
        category: parseInt(invWritingType),
        invWriting: $("#invWritngInput").val(),
        addDate: date,
        mostPopular: 0,
      });

      $("#inv-writingModal").modal("hide");
    } catch (e) {}
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
    const qaModal = $("#inv-writingModal");

    qaModal.modal("show");
  });
});

$(document).ready(function () {
  $("#inwWritingFilterSelect").change("change", async function () {
    // Select alanının seçilen değerini al
    var selectedValue = $("#inwWritingFilterSelect").val();

    products.innerHTML = "";

    if (selectedValue == "1") {
      const getData = query(
        collection(db, "InvitationWriting"),
        where("category", "==", selectedValue)
      );

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
    } else if (selectedValue == "2") {
      const getData = query(
        collection(db, "InvitationWriting"),
        where("category", "==", selectedValue)
      );

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
    } else if (selectedValue == "3") {
      const getData = query(
        collection(db, "InvitationWriting"),
        where("category", "==", selectedValue)
      );

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
    } else if (selectedValue == "4") {
      const getData = query(
        collection(db, "InvitationWriting"),
        where("category", "==", selectedValue)
      );

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
    } else if (selectedValue == "5") {
      const getData = query(
        collection(db, "InvitationWriting"),
        where("category", "==", selectedValue)
      );

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
    } else if (selectedValue == "0") {
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
    }
  });
});
