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

const products = document.querySelector(".qaCard");

function createQaArray([
  firebaseQaDocId,
  firebaseQaQuestion,
  firebaseQaAnswer,
  firebaseQaAnswerDate,
  firebaseQaQuestionDate,
  firebaseQaAnswerStatus,
  firebaseproductModelNo,
  firebaseQaEmail,
  firebaseQaFullName,
]) {
  if (firebaseQaAnswerStatus == "0") {
    let proCode = `

    <div class="d-flex justify-content-between border rounded-2 m-1"> 

    <div class="row"
        
    <h6    class="m-2 p-1" style="padding: 1%;"> Soru :  ${firebaseQaQuestion} </h6>

    <h6 class="m-2 p-1" style="padding: 1%;"> Cevap : ${firebaseQaAnswer}</h6>

    </div>

    <button type="button" data-keys="${firebaseQaDocId}" data-keyQ="${firebaseQaQuestion}" class="btn btn-primary answerBtn m-2">Cevapla</button>

    </div>

    `;
    products.innerHTML += proCode;
  } else if (firebaseQaAnswerStatus == "1") {
    let proCode = `

    <div class="d-flex justify-content-between border rounded-2 m-1"> 

    <div class="row"
        
    <h6    class="m-2 p-1" style="padding: 1%;"> Soru :  ${firebaseQaQuestion} </h6>

    <h6 class="m-2 p-1" style="padding: 1%;"> Cevap : ${firebaseQaAnswer}</h6>

    </div>

    <button type="button" data-keys="${firebaseQaDocId}" data-keyQ="${firebaseQaQuestion}" class="btn btn-success answerBtn m-2" disabled>Cevaplandı</button>

    </div>

    `;
    products.innerHTML += proCode;
  }
}

var qaDocumentId;

$("body").on("click", ".answerBtn", async function () {
  var $key = $(this).data("keys");

  qaDocumentId = $key;

  const qaModal = $("#qaModals");

  qaModal.modal("show");
});

$("#answerSendButton").on("click", async function () {
  const date = new Date();

  try {
    console.log($("#answerInput").val());
    const updateRefs = doc(db, "QA", qaDocumentId);

    await updateDoc(updateRefs, {
      answer: $("#answerInput").val(),
      answerStatus: "1",
      answerDate: date,
    });

    const qaModal = $("#qaModals");

    qaModal.modal("hide");
  } catch (error) {}
});

let QaItem = [];

const getData = query(collection(db, "QA"), orderBy("questionDate", "desc"));

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {
  const firebaseQaDocId = doc.id;

  const firebaseQaQuestion = doc.data().question;
  const firebaseQaAnswer = doc.data().answer;
  const firebaseQaAnswerDate = doc.data().answerDate;
  const firebaseQaQuestionDate = doc.data().questionDate;
  const firebaseQaAnswerStatus = doc.data().answerStatus;
  const firebaseproductModelNo = doc.data().productModelNo;
  const firebaseQaEmail = doc.data().email;
  const firebaseQaFullName = doc.data().fullName;

  let QaItem = [
    firebaseQaDocId,
    firebaseQaQuestion,
    firebaseQaAnswer,
    firebaseQaAnswerDate,
    firebaseQaQuestionDate,
    firebaseQaAnswerStatus,
    firebaseproductModelNo,
    firebaseQaEmail,
    firebaseQaFullName,
  ];

  createQaArray(QaItem);
});

$(document).ready(function () {
  $("#qaFormSelect").on("click", async function () {
    // Select alanının seçilen değerini al

    console.log(createQaArray.length);
  });
});

$(document).ready(function () {
  $("#qaFormSelect").change("change", async function () {
    // Select alanının seçilen değerini al
    var selectedValue = $("#qaFormSelect").val();

    products.innerHTML = "";

    if (selectedValue == "0" || selectedValue == "1") {
      var answerStatusStr = selectedValue;

      const getData = query(
        collection(db, "QA"),
        where("answerStatus", "==", answerStatusStr),
        orderBy("questionDate", "desc")
      );

      const querySnapshot = await getDocs(getData);
      querySnapshot.forEach((doc) => {
        const firebaseQaDocId = doc.id;

        const firebaseQaQuestion = doc.data().question;
        const firebaseQaAnswer = doc.data().answer;
        const firebaseQaAnswerDate = doc.data().answerDate;
        const firebaseQaQuestionDate = doc.data().questionDate;
        const firebaseQaAnswerStatus = doc.data().answerStatus;
        const firebaseproductModelNo = doc.data().productModelNo;
        const firebaseQaEmail = doc.data().email;
        const firebaseQaFullName = doc.data().fullName;

        QaItem.splice(0, QaItem.length);

        QaItem = [
          firebaseQaDocId,
          firebaseQaQuestion,
          firebaseQaAnswer,
          firebaseQaAnswerDate,
          firebaseQaQuestionDate,
          firebaseQaAnswerStatus,
          firebaseproductModelNo,
          firebaseQaEmail,
          firebaseQaFullName,
        ];

        createQaArray(QaItem);
      });
    } else if (selectedValue == "") {
      var answerStatusStr = selectedValue;

      const getData = query(
        collection(db, "QA"),
        orderBy("questionDate", "desc")
      );

      const querySnapshot = await getDocs(getData);
      querySnapshot.forEach((doc) => {
        const firebaseQaDocId = doc.id;

        const firebaseQaQuestion = doc.data().question;
        const firebaseQaAnswer = doc.data().answer;
        const firebaseQaAnswerDate = doc.data().answerDate;
        const firebaseQaQuestionDate = doc.data().questionDate;
        const firebaseQaAnswerStatus = doc.data().answerStatus;
        const firebaseproductModelNo = doc.data().productModelNo;
        const firebaseQaEmail = doc.data().email;
        const firebaseQaFullName = doc.data().fullName;

        QaItem.splice(0, QaItem.length);

        QaItem = [
          firebaseQaDocId,
          firebaseQaQuestion,
          firebaseQaAnswer,
          firebaseQaAnswerDate,
          firebaseQaQuestionDate,
          firebaseQaAnswerStatus,
          firebaseproductModelNo,
          firebaseQaEmail,
          firebaseQaFullName,
        ];

        createQaArray(QaItem);
      });
    }
  });
});
